import Mailgen from 'mailgen';

export const resetUserPasswordMailgen = (name: string, email: string, resetUserCode: string) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Motors shop e-commerce',
      link: 'http://localhost:5173',
    },
  });

  const emailContent = {
    body: {
      name: name,
      intro: 'Redefinição de senha da conta do Motors shop e-commerce',
      action: {
        instructions: 'Clique para resetar sua senha:',
        button: {
          color: '#495057',
          text: 'Reset your password',
          link: `http://localhost:5173/resetPassword/${resetUserCode}`,
        },
      },
    },
  };

  const emailBody = mailGenerator.generate(emailContent);

  const emailTextTemplate = {
    to: email,
    subject: 'Código de redefinição de senha',
    text: emailBody,
  };

  return emailTextTemplate;
};
