import React, { FC } from 'react';
import http from './Clients/AWSClient';
import { Layout, PageBlock } from 'vtex.styleguide';

const AdminLeads: FC = () => {
  const [leads, setLeads] = React.useState([]);
  React.useEffect(() => {
    http
      .get('/dev?TableName=LeadCaptureTable')
      .then(({ data: { Items } }) => {
        return setLeads(Items);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <PageBlock
        title="Leads"
        subtitle="Leads Captured by the form."
        variation="full"
      >
        <h1>Hello, World!</h1>
        {leads.map((el, index) => {
          console.log(el);
          return (
            <div key={index} className="flex">
              <p className="w-7">{index + 1}: </p>
              <p className="w-25">{`Nome: ${el.name}`}</p>
              <p className="w-40">{`E-mail: ${el.email}`}</p>
              <p className="w-30">{`Phone: ${el.phone}`}</p>
            </div>
          );
        })}
      </PageBlock>
    </Layout>
  );
};

export default AdminLeads;
