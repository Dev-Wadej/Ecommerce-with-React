import {
  FormInputLabel,
  Group,
  Input,
} from './form-input.styles.jsx';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={otherProps.value.length}
          htmlFor="name"
        >
          {' '}
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
export default FormInput;
