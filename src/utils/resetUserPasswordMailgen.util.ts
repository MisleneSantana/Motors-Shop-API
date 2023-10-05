import Mailgen from 'mailgen';

export const resetUserPasswordMailgen = (name: string, email: string, resetUserCode: string) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Equipe Motors Shop',
      link: 'http://localhost:5173',
    },
  });

  const emailContent = {
    body: {
      name: name,
      intro:
        'Estamos te enviando este e-mail porque recebemos uma solicitação de redefinição de senha para sua conta. Insira este código para confirmar que é você.',
      text: resetUserCode,
      action: {
        instructions: 'Se você não solicitou este código, recomendamos que altere sua senha no botão abaixo:',
        button: {
          color: '#495057',
          text: 'Redefina sua senha',
          link: `http://localhost:5173/resetPassword/${resetUserCode}`,
        },
      },
    },
    outro: 'Obrigada por nos ajudar a manter sua conta segura.',
  };

  const emailBody = mailGenerator.generate(emailContent);

  const emailTextTemplate = {
    to: email,
    subject: 'Código de redefinição de senha',
    text: emailBody,
  };

  return emailTextTemplate;
};
