import { Text, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, pseudoPropNames } from '@chakra-ui/react'
import { Form, useFormikContext, Formik, useField, FieldInputProps, Field } from 'Formik'
import { Container } from '../components/Container'
import { Wrapper } from '../components/Wrapper'
import { useRouter } from "next/router";
import { Hero } from '../components/Hero';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/utils';
import { InputField } from '../components/InputField';

const Register = () => {
  return (
    <Container height="100vh">
      <Hero title="Register W3 ledgers" />
      <RegisterComponent />

      <DarkModeSwitch />
      <Footer>
        <Text>❤️ Neo Ledgers</Text>
      </Footer>
    </Container>
  );
}

const RegisterComponent = ({ }) => {
  const [registerReponse, register] = useRegisterMutation();
  const router = useRouter()

  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values,{setErrors}) => {
        console.log(values);
        const response = await register(values)
        if( response.data?.register.errors ) {
          setErrors(toErrorMap(response.data.register.errors))
        } else {
          router.push("/")
        }
      }}>
      {(props) => {
        const { values, errors, touched, handleChange, isSubmitting } = props;
        return (
          <Wrapper variant='small'>
            <Form>
              <InputField label="Email" placeholder='email' name='email' />
              <InputField label="Username" placeholder='username' name='username' />
              <Box mt={4}>
                <InputField label="Password" placeholder='password' name='password' type='password' />
              </Box>
              <Button mt={4} type='submit'
                colorScheme={'teal'}
                isLoading={isSubmitting}
              >register</Button>
            </Form>
          </Wrapper>
        )
      }}
    </Formik>
  )
}

export default Register


