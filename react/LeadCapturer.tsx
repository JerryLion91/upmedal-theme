import * as React from 'react';

interface Lead {
  name: String;
  email: String;
  phone: String;
}

interface LeadCapturerProps {}

const LeadCapturer: StorefrontFunctionComponent<LeadCapturerProps> = ({}) => {
  const [lead, setLead] = React.useState({ name: '', email: '', phone: '' });

  const handleFormChange = (property: string, value: string) =>
    setLead((prev) => ({ ...prev, [property]: value }));

  const sendLead = (lead: Lead) => console.log({ lead });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendLead(lead);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={lead.name}
        onChange={({ target: { value } }) => handleFormChange('name', value)}
      />
      <input
        type="email"
        value={lead.email}
        onChange={({ target: { value } }) => handleFormChange('email', value)}
      />
      <input
        type="phone"
        value={lead.phone}
        onChange={({ target: { value } }) => handleFormChange('phone', value)}
      />
      <input type="submit" />
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
