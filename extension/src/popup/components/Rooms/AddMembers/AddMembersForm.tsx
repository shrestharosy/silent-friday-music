import * as React from 'react';
import { withFormik, FormikBag, InjectedFormikProps, Form } from 'formik';
import { fetchUsersAction, addMembersToRoomAction } from 'src/actionCreators/actionCreator';
import { IRoomReduxState } from 'src/scripts/background/reducers/room';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IUser } from 'src/sagas/user/effects';
import { IProfileReduxState } from 'src/scripts/background/reducers/profile';
import Select from 'react-select';

interface IAddMembersFormState {
  isLoading: boolean;
  options: Array<IOptionsProps>;
}

interface IAddMembersFormProps {
  room: IRoomReduxState;
  profile: IProfileReduxState;
  fetchUsersAction: typeof fetchUsersAction;
  addMembersToRoomAction: typeof addMembersToRoomAction;
}

interface IFormValues {
  usersList: Array<IOptionsProps>;
}

interface IOptionsProps {
  value: string;
  label: string;
}

class AddMembersForm extends React.Component<
  InjectedFormikProps<IAddMembersFormProps, IFormValues>,
  IAddMembersFormState
> {
  constructor(props: Readonly<InjectedFormikProps<IAddMembersFormProps, IFormValues>>) {
    super(props);
    this.state = {
      isLoading: false,
      options: [],
    };
  }

  clearUserSelect = () => {
    this.setState({});
  };
  getOptionsAsync = async (input: string) => {
    this.setState({
      isLoading: true,
    });

    const users = await new Promise((resolve, reject) => {
      this.props.fetchUsersAction(resolve, reject);
    })
      .then((users: Array<IUser>) => {
        return users;
      })
      .catch(error => {
        throw error;
      });

    const currentUsers = this.props.room.members;

    const isNotCurrentlyInRoom = (userId: string) => {
      return !currentUsers.includes(userId);
    };

    const filteredUsers: Array<IUser> = users.filter((user: IUser) => {
      return user._id !== this.props.profile._id && isNotCurrentlyInRoom(user._id);
    });

    const mappedOptions: Array<IOptionsProps> = filteredUsers.map((user: IUser) => {
      return { value: user._id, label: user.name };
    });

    this.setState({
      options: mappedOptions ? mappedOptions : [],
      isLoading: false,
    });
  };

  handleUserSelect = (value: Array<IOptionsProps>) => {
    value = value ? value : [];
    this.props.setFieldValue('usersList', value);
  };

  render() {
    const {
      values: { usersList },
      dirty,
      isSubmitting,
      errors,
      touched,
    } = this.props;

    const { isLoading, options } = this.state;

    return (
      <div className="add-member-form-wrapper">
        <Form>
          <Select
            id={'usersList'}
            name={'usersList'}
            // classNamePrefix={'select-active'}
            placeholder={'Enter name of your friends...'}
            isLoading={isLoading}
            options={options}
            onChange={this.handleUserSelect}
            onMenuOpen={() => this.getOptionsAsync('')}
            // onInputChange={this.handleInputChange}
            value={usersList}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            className={'user-select'}
          />
          {touched.usersList && errors && errors.usersList && <span>{errors.usersList}</span>}
          <button type="submit" disabled={!dirty || isSubmitting} className="create-button">
            {isSubmitting ? 'Working on it...' : 'Add Members'}
          </button>
        </Form>
      </div>
    );
  }
}

const WrappedWithFormik = withFormik<IAddMembersFormProps, IFormValues>({
  enableReinitialize: true,
  mapPropsToValues() {
    return {
      usersList: [],
      errorInUsersList: '',
    };
  },
  validate: (values: IFormValues) => {
    let errors: { [key: string]: string } = {};
    if (values.usersList.length === 0) {
      errors.usersList = 'Please select at least one user';
    }
    return errors;
  },
  handleSubmit: async (values: IFormValues, actions: FormikBag<IAddMembersFormProps, {}>) => {
    const { usersList } = values;
    const { _id: roomId } = actions.props.room;
    const members: string[] = usersList.map((user: IOptionsProps) => {
      return user.value;
    });
    try {
      await actions.props.addMembersToRoomAction({ roomId, members });
      actions.resetForm();
    } catch (error) {
      throw error;
    }
    actions.setSubmitting(false);
  },
})(AddMembersForm);

const mapStateToProps = ({ room, profile }: IReduxState) => ({ room, profile });

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fetchUsersAction: typeof fetchUsersAction;
    addMembersToRoomAction: typeof addMembersToRoomAction;
  }>
) => bindActionCreators({ fetchUsersAction, addMembersToRoomAction }, dispatch);

const AddMembersConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedWithFormik);

export default AddMembersConnectedForm;
