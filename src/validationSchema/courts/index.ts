import * as yup from 'yup';

export const courtValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  availability: yup.boolean().required(),
  user_id: yup.string().nullable().required(),
});
