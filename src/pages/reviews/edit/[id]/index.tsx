import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getReviewById, updateReviewById } from 'apiSdk/reviews';
import { reviewValidationSchema } from 'validationSchema/reviews';
import { ReviewInterface } from 'interfaces/review';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ReviewEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ReviewInterface>(
    () => (id ? `/reviews/${id}` : null),
    () => getReviewById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ReviewInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateReviewById(id, values);
      mutate(updated);
      resetForm();
      router.push('/reviews');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ReviewInterface>({
    initialValues: data,
    validationSchema: reviewValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Reviews',
              link: '/reviews',
            },
            {
              label: 'Update Review',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Review
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Fair Play"
            formControlProps={{
              id: 'fair_play',
              isInvalid: !!formik.errors?.fair_play,
            }}
            name="fair_play"
            error={formik.errors?.fair_play}
            value={formik.values?.fair_play}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('fair_play', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Playability"
            formControlProps={{
              id: 'playability',
              isInvalid: !!formik.errors?.playability,
            }}
            name="playability"
            error={formik.errors?.playability}
            value={formik.values?.playability}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('playability', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Punctuality"
            formControlProps={{
              id: 'punctuality',
              isInvalid: !!formik.errors?.punctuality,
            }}
            name="punctuality"
            error={formik.errors?.punctuality}
            value={formik.values?.punctuality}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('punctuality', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Availability"
            formControlProps={{
              id: 'availability',
              isInvalid: !!formik.errors?.availability,
            }}
            name="availability"
            error={formik.errors?.availability}
            value={formik.values?.availability}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('availability', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'reviewer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/reviews')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'review',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ReviewEditPage);
