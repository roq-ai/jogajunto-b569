import * as yup from 'yup';

export const matchValidationSchema = yup.object().shape({
  score: yup.number().integer().required(),
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  schedule_id: yup.string().nullable().required(),
  opponent_id: yup.string().nullable().required(),
});
