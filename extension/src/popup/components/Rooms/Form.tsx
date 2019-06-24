import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, InjectedFormikProps, withFormik, FormikBag } from 'formik';
import Select from 'react-select';

import { fillActiveAction, fetchUsers } from 'src/actionCreators/actionCreator';

interface ICreateRoomFormProps {
  fetchUsers: typeof fetchUsers;
}

const SKUOperatorOptions = [
  { value: 'EQUAL', label: '=' },
  { value: 'GREATER_THAN', label: '>' },
  { value: 'LESS_THAN', label: '<' },
];

interface IFormValues {
  roomName: string;
}

class CreateRoomForm extends React.Component<InjectedFormikProps<ICreateRoomFormProps, IFormValues>, {}> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.props.setFieldValue('roomName', value.trim());
  };

  getOptionsAsync = async (imput: string) => {
    const users = await new Promise((resolve, reject) => {
      this.props.fetchUsers(resolve, reject);
    });
  };

  render() {
    const {
      values: { roomName },
      dirty,
      isSubmitting,
    } = this.props;
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

        <Select
          //   id={name}
          //   name={name}
          className={'select-custom'}
          classNamePrefix={'select-active'}
          placeholder={'Add members'}
          options={SKUOperatorOptions}
          onChange={this.handleChange}
          onMenuOpen={() => this.getOptionsAsync('')}
          //   value={selectedValue}
          isSearchable={true}
          isClearable={true}
          isMulti={true}
        />
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
    };
  },
  validate: (values: IFormValues) => {
    if (values.roomName.length === 0) {
      return;
    }
  },
  handleSubmit(values: IFormValues, actions: FormikBag<{}, {}>) {
    actions.setSubmitting(false);
  },
})(CreateRoomForm);

const mapDispatchToProps = (
  dispatch: Dispatch<{
    fetchUsers: typeof fetchUsers;
  }>
) => bindActionCreators({ fetchUsers }, dispatch);

const ConnectedForm = connect(
  null,
  mapDispatchToProps
)(WrappedForm);

export default ConnectedForm;
