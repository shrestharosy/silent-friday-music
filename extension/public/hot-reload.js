// SRC: https://60devs.com/hot-reloading-for-chrome-extensions.html
//  Use File and Directory Entries API to get the list of all files in the extension directory recursively

const filesInDirectory = dir =>
  new Promise(resolve =>
    dir.createReader().readEntries(entries =>
      Promise.all(
        entries
          .filter(e => e.name[0] !== ".")
          .map(e =>
            e.isDirectory
              ? filesInDirectory(e)
              : new Promise(resolve => e.file(resolve))
          )
      )
        .then(files => [].concat(...files))
        .then(resolve)
    )
  );

// concatenates the file names and lastModifiedDate of all files resulting in a single string
const timestampForFilesInDirectory = dir =>
  filesInDirectory(dir).then(files =>
    files.map(f => f.name + f.lastModifiedDate).join()
  );

// reloads the active tab if there are any changes
const reload = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
    }

    chrome.runtime.reload();
  });
};

// watchdog that checks for changes every 1000ms
const watchChanges = (dir, lastTimestamp) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
    } else {
      reload();
    }
  });
};

// start watch only if the extension is loaded in the developer mode
chrome.management.getSelf(self => {
  if (self.installType === "development") {
    chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
  }
});

// testinggt