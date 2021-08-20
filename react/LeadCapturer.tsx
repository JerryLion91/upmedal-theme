import * as React from 'react';
import http from './Clients/AWSClient';

interface Lead {
  name: String;
  email: String;
  phone: String;
}
interface LeadCapturerProps {}

const LeadCapturer: StorefrontFunctionComponent<LeadCapturerProps> = () => {
  const [sended, setSended] = React.useState(false);

  const [lead, setLead] = React.useState({ name: '', email: '', phone: '' });

  const handleFormChange = (property: string, value: string) =>
    setLead((prev) => ({ ...prev, [property]: value }));

  const sendLead = (lead: Lead) => {
    http
      .post('/dev', {
        TableName: 'LeadCaptureTable',
        Item: lead,
      })
      .then(({ data }) => {
        return console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendLead(lead);
    setSended(true);
  };

  if (sended)
    return (
      <div className="c-action-primary overflow-hidden br3 h-100 w-100 flex flex-column justify-between center tc">
        <p className="ma5 br2 bw1 b--solid b--muted-4 ph4 pv5">
          O seu cupom esta a caminho.
          <br />
          <br />
          Verifique sua caixa de entrada
        </p>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="c-action-primary overflow-hidden br3 h-100 w-100 flex flex-column justify-between center tc"
    >
      <h5 className="fwb lh-copy">
        Cadastre-se e receba um cupom com <br />
        <span className="c-action-secondary"> 10% de desconto </span>
        <br />
        para sua proxima compra
      </h5>
      <input
        placeholder="Nome"
        className="mh5 mv3 br2 bw1 b--solid b--muted-4 pa4"
        type="text"
        value={lead.name}
        required
        onChange={({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) =>
          handleFormChange('name', value)
        }
      />

      <input
        placeholder="E-mail"
        className="mh5 mv3 br2 bw1 b--solid b--muted-4 pa4"
        type="email"
        value={lead.email}
        required
        onChange={({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) =>
          handleFormChange('email', value)
        }
      />

      <input
        placeholder="Telefone"
        className="mh5 mv3 br2 bw1 b--solid b--muted-4 pa4"
        type="phone"
        value={lead.phone}
        onChange={({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) =>
          handleFormChange('phone', value)
        }
      />
      <input type="submit" className="mh5 mv3 br2 bw1 b--solid b--muted-4" />
    </form>
  );
};

LeadCapturer.schema = {
  title: 'editor.LeadCapturer.title',
  description: 'editor.LeadCapturer.description',
  type: 'object',
  properties: {},
};

export default LeadCapturer;
