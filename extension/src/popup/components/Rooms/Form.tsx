import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, InjectedFormikProps, withFormik, FormikBag } from 'formik';
import Select from 'react-select';

import { fetchUsers } from 'src/actionCreators/actionCreator';
import { IUser } from '../../../sagas/user/effects';
import { IReduxState } from 'src/scripts/background/reducers/rootReducer';
import { IProfileReduxState } from 'src/scripts/background/reducers/profile';

interface ICreateRoomFormProps {
  profile: IProfileReduxState;
  fetchUsers: typeof fetchUsers;
}

interface IFormValues {
  roomName: string;
  usersList: Array<IOptionsProps>;
  errorInRoomName: string;
  errorInUsersList: string;
}

interface ICreateRoomFormState {
  isLoading: boolean;
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
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.props.setFieldValue('roomName', value.trim());
  };

  getOptionsAsync = async (input: string) => {
    this.setState({
      isLoading: true,
    });
    // const formattedInput = input ? input : '';
    const users = await new Promise((resolve, reject) => {
      this.props.fetchUsers(resolve, reject);
    })
      .then((users: Array<IUser>) => {
        return users;
      })
      .catch(error => {
        throw error;
      });

    const filteredUsers: Array<IUser> = users.filter((user: IUser) => {
      return user.name !== this.props.profile.name;
    });

    const mappedOptions: Array<IOptionsProps> = filteredUsers.map((user: IUser) => {
      return { value: user.name, label: user.name };
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
    return (
      <Form>
        <input
          name={'roomName'}
          id={'roomName'}
          type="text"
          className={'song-input'}
          value={roomName}
          onChange={event => this.handleChange(event)}
          placeholder={'Enter Room Name'}
        />

        <span>{errors && touched.roomName && errors.errorInRoomName}</span>

        <Select
          id={'usersList'}
          name={'usersList'}
          // className={'select-custom'}
          // classNamePrefix={'select-active'}
          placeholder={'Add members'}
          isLoading={isLoading}
          options={options}
          onChange={this.handleUserSelect}
          onMenuOpen={() => this.getOptionsAsync('')}
          // onInputChange={this.handleInputChange}
          value={usersList}
          isSearchable={true}
          isClearable={true}
          isMulti={true}
        />

        <span>{errors && touched.usersList && errors.errorInUsersList}</span>
        <button
          type="submit"
          disabled={!dirty || isSubmitting}
          //   onClick={() => props.apply(values)}
        >
          START STREAMING
        </button>
      </Form>
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
    let errors = { errorInRoomName: '', errorInUsersList: '' };
    if (values.roomName.length === 0) {
      errors.errorInRoomName = 'Please enter a room name';
    }
    if (values.usersList.length === 0) {
      errors.errorInUsersList = 'Please select at least one user';
    }
    if (Object.keys(errors).length) {
      return errors;
    }
  },
  handleSubmit(values: IFormValues, actions: FormikBag<{}, {}>) {
    // inside action
    actions.setSubmitting(false);
  },
})(CreateRoomForm);

const mapStateToProps = ({ profile }: IReduxState) => ({ profile });

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fetchUsers: typeof fetchUsers;
  }>
) => bindActionCreators({ fetchUsers }, dispatch);

const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForm);

export default ConnectedForm;
