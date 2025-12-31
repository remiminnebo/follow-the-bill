import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface WelcomeEmailProps {
  email?: string;
}

export const WelcomeEmail = ({ email }: WelcomeEmailProps) => {
  const previewText = 'Welcome to Follow The Bill';

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Welcome to <strong>Follow The Bill</strong>
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello{email ? ` ${email}` : ''},
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Thank you for subscribing to our newsletter. We're excited to have you join our community of strategic investors tracking the AI ecosystem.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                You can expect monthly reports deep-diving into the capital flows of AI infrastructure, from hyperscalers to fundamental resources.
              </Text>
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href="https://ftb.minnebo.ai/reports"
                >
                  View Latest Reports
                </Button>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                If you have any questions or want to join the discussion, feel free to reply to this email or visit our forum.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
