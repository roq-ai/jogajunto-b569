import * as yup from 'yup';

export const scheduleValidationSchema = yup.object().shape({
  match_date: yup.date().required(),
  match_time: yup.date().required(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
