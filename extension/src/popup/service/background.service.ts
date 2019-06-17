export default function({ type, data }: { type: string; data?: Object }) {
  const action = {
    type,
    data,
  };
  chrome.runtime.sendMessage(action);
}
