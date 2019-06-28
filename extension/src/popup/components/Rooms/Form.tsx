import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, InjectedFormikProps, withFormik, FormikBag } from 'formik';
import Select from 'react-select';

import { fetchUsersAction, createRoomAction, fillActiveAction } from 'src/actionCreators/actionCreator';
import { IUser } from '../../../sagas/user/effects';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { IProfileReduxState } from 'src/scripts/background/reducers/profile';
import { AvailableComponents } from 'src/scripts/background/reducers/active';
import { IRoom } from './Rooms';

interface ICreateRoomFormProps {
  profile: IProfileReduxState;
  fetchUsersAction: typeof fetchUsersAction;
  createRoomAction: typeof createRoomAction;
  fillActiveAction: typeof fillActiveAction;
}

interface IFormValues {
  roomName: string;
  usersList: Array<IOptionsProps>;
}

interface ICreateRoomFormState {
  isLoading: boolean;
  isSubmit: boolean;
  options: Array<IOptionsProps>;
}

interface IOptionsProps {
  value: string;
  label: string;
}

class CreateRoomForm extends React.Component<
  InjectedFormikProps<ICreateRoomFormProps, IFormValues>,
  ICreateRoomFormState
> {
  constructor(props: Readonly<InjectedFormikProps<ICreateRoomFormProps, IFormValues>>) {
    super(props);
    this.state = {
      isLoading: false,
      options: [],
      isSubmit: false,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.props.setFieldValue('roomName', value);
  };

  getOptionsAsync = async (input: string) => {
    this.setState({
      isLoading: true,
    });

    // const formattedInput = input ? input : '';
    const users = await new Promise((resolve, reject) => {
      this.props.fetchUsersAction(resolve, reject);
    })
      .then((users: Array<IUser>) => {
        return users;
      })
      .catch(error => {
        throw error;
      });

    const filteredUsers: Array<IUser> = users.filter((user: IUser) => {
      return user._id !== this.props.profile._id;
    });

    const mappedOptions: Array<IOptionsProps> = filteredUsers.map((user: IUser) => {
      return { value: user._id, label: user.name };
    });

    this.setState({
      options: mappedOptions ? mappedOptions : [],
      isLoading: false,
    });
  };

  // handleInputChange = (input: string) => {
  //   this.getOptionsAsync(input);
  // };

  handleUserSelect = (value: Array<IOptionsProps>) => {
    value = value ? value : [];
    this.props.setFieldValue('usersList', value);
  };

  render() {
    const {
      values: { roomName, usersList },
      dirty,
      isSubmitting,
      errors,
      touched,
    } = this.props;

    const { isLoading, options } = this.state;

    console.log(isSubmitting);
    return (
      <div className="new-room-form-wrapper">
        <Form>
          <input
            name={'roomName'}
            id={'roomName'}
            type="text"
            className={'name-input'}
            value={roomName}
            onChange={event => this.handleChange(event)}
            placeholder={'Enter Room Name'}
          />

          {touched.roomName && errors && errors.roomName && <span>{errors.roomName}</span>}

          <Select
            id={'usersList'}
            name={'usersList'}
            placeholder={'Enter name of your friends...'}
            isLoading={isLoading}
            options={options}
            onChange={this.handleUserSelect}
            onMenuOpen={() => this.getOptionsAsync('')}
            value={usersList}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            className={'user-select'}
          />

          {touched.usersList && errors && errors.usersList && <span>{errors.usersList}</span>}
          <button type="submit" disabled={!dirty || isSubmitting} className="create-button">
            {isSubmitting ? 'PLEASE WAIT...' : 'START STREAMING'}
          </button>
        </Form>
      </div>
    );
  }
}

const WrappedForm = withFormik<ICreateRoomFormProps, IFormValues>({
  enableReinitialize: true,
  mapPropsToValues() {
    return {
      roomName: '',
      usersList: [],
      errorInRoomName: '',
      errorInUsersList: '',
    };
  },
  validate: (values: IFormValues) => {
    let errors: { [key: string]: string } = {};
    if (values.roomName.trim().length === 0) {
      errors.roomName = 'Please enter a room name';
    }
    return errors;
  },
  handleSubmit: async (values: IFormValues, actions: FormikBag<ICreateRoomFormProps, {}>) => {
    const { roomName, usersList } = values;
    const trimmedName = roomName.trim();
    const members: string[] = usersList.map((user: IOptionsProps) => {
      return user.value;
    });
    try {
      const room = await new Promise((resolve, reject) => {
        actions.props.createRoomAction({ name: trimmedName, members }, resolve, reject);
      }).then((room: IRoom) => {
        return room;
      });
      actions.props.fillActiveAction({
        component: AvailableComponents.ROOM_DETAILS,
        id: room._id,
      });
      actions.setSubmitting(false);
    } catch (error) {
      actions.setSubmitting(false);
      throw error;
    }
  },
})(CreateRoomForm);

const mapStateToProps = ({ profile }: IReduxState) => ({ profile });

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fetchUsersAction: typeof fetchUsersAction;
    createRoomAction: typeof createRoomAction;
    fillActiveAction: typeof fillActiveAction;
  }>
) => bindActionCreators({ fetchUsersAction, createRoomAction, fillActiveAction }, dispatch);

const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForm);

export default ConnectedForm;
