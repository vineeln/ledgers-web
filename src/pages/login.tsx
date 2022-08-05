import { Text, Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'Formik'
import { Container } from '../components/Container'
import { Wrapper } from '../components/Wrapper'
import { useRouter } from "next/router";
import { Hero } from '../components/Hero';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/utils';
import { InputField } from '../components/InputField';

const Login = () => {
  return (
    <Container height="100vh">
      <Hero title="Login W3 ledgers" />
      <LoginComponent />

      <DarkModeSwitch />
      <Footer>
        <Text>❤️ Neo Ledgers</Text>
      </Footer>
    </Container>
  );
}

const LoginComponent = ({ }) => {
  const [, loginRequest] = useLoginMutation();
  const router = useRouter()

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values,{setErrors}) => {
        const response = await loginRequest(values)
        if( response.data?.login.errors ) {
          setErrors(toErrorMap(response.data.login.errors))
        } else {
          router.push("/")
        }
      }}>
      {(props) => {
        const { values, errors, touched, handleChange, isSubmitting } = props;
        return (
          <Wrapper variant='small'>
            <Form>
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


export default Login


