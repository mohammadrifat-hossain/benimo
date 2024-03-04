interface EmailTemplateProps {
  name: string;
  code: Number
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  code
}) => (
  <div className="w-full flex items-center justify-center">
    <div>
      <h3>Hi {name}</h3>

      <p>Your verification code is</p>
      <h1>{code.toString()}</h1>

    </div>
  </div>
);