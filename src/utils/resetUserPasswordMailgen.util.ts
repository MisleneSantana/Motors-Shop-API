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
      intro: 'Estamos te enviando este e-mail porque recebemos uma solicitação de redefinição de senha para sua conta.',
      action: {
        instructions:
          'Clique no botão abaixo para visualizar o código enviado pela nossa equipe e redefinir sua senha:',
        button: {
          color: '#495057',
          text: 'Redefina sua senha',
          link: `http://localhost:5173/resetPassword/${resetUserCode}`,
        },
      },
    },
    outro: 'Se você não solicitou uma redefinição de senha, favor desconsiderar este e-mail.',
  };

  const emailBody = mailGenerator.generate(emailContent);

  const emailTextTemplate = {
    to: email,
    subject: 'Código de redefinição de senha',
    text: emailBody,
  };

  return emailTextTemplate;
};
