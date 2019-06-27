import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import AddMembersForm from './AddMembersForm';

interface IAddMembersProps {
  roomId: string;
  showAddMembers: boolean;
  toggleAddMembers: () => void;
}

class AddMembers extends React.Component<IAddMembersProps, {}> {
  render() {
    const { showAddMembers, toggleAddMembers } = this.props;

    return (
      <div className={`cd-panel cd-panel-bottom from-bottom ${showAddMembers ? 'is-visible' : ''} `}>
        <div className="cd-panel-container">
          <div className="container cd-panel-content">
            <div className="playlist-title-bar no-focus-outline">
              <button className="btn btn-one cd-panel-close " onClick={toggleAddMembers}>
                <FontAwesomeIcon icon={faChevronCircleLeft} className="back-icon" />
              </button>
              <span className="playlist-title">Add People</span>
            </div>
            <AddMembersForm />
          </div>
        </div>
      </div>
    );
  }
}

export default AddMembers;
