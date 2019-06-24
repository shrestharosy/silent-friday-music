import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, InjectedFormikProps, withFormik, FormikBag } from 'formik';

import { fillActiveAction } from 'src/actionCreators/actionCreator';

interface ICreateRoomFormProps {}

interface IFormValues {
  roomName: string;
}

class CreateRoomForm extends React.Component<InjectedFormikProps<{}, IFormValues>, {}> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.props.setFieldValue('roomName', value.trim());
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
          name={name}
          id={name}
          type="text"
          className={'song-input'}
          value={roomName}
          onChange={event => this.handleChange(event)}
          placeholder={'Enter Room Name'}
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

const WrappedForm = withFormik<{}, IFormValues>({
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
    fillActiveAction: typeof fillActiveAction;
  }>
) => bindActionCreators({ fillActiveAction }, dispatch);

const ConnectedForm = connect(
  null,
  mapDispatchToProps
)(WrappedForm);

export default ConnectedForm;
