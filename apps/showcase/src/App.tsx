import React, { useState } from 'react';
import {
  Button,
  Card,
  Badge,
  Tag,
  StatusPill,
  Input,
  TextArea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Avatar,
  Spinner,
  VStack,
  HStack,
  Alert,
  Modal,
  Logo,
} from '@airwaste/design-system-web';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="mb-4 text-lg font-bold text-brand-dark">{title}</h2>
    <div className="flex flex-wrap gap-4">{children}</div>
  </section>
);

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('a');

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 flex items-center gap-4">
        <Logo height={48} />
        <div>
          <h1 className="text-2xl font-extrabold text-brand-primary">AirWaste Design System</h1>
          <p className="text-sm text-neutral-500">@airwaste/design-system-web · live component gallery</p>
        </div>
      </header>

      <Section title="Buttons">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button loading>Loading</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="Status & Badges">
        <StatusPill status="VERIFIED" />
        <StatusPill status="ACTIVE" />
        <StatusPill status="SUSPENDED" />
        <StatusPill status="PENDING" />
        <StatusPill status="COMPLETED" />
        <Badge status="SUCCESS">Success</Badge>
        <Badge status="WARNING">Warning</Badge>
        <Badge status="ERROR">Error</Badge>
        <Tag color="#15803D">Recycling</Tag>
        <Tag color="#22C55E">Organic</Tag>
      </Section>

      <Section title="Cards & Alerts">
        <Card className="max-w-xs">
          <h3 className="mb-1 font-semibold text-brand-dark">Collector summary</h3>
          <p className="text-sm text-neutral-600">12 pickups completed this week. Rating 4.8.</p>
        </Card>
        <VStack gap={3} className="max-w-xs">
          <Alert tone="success" title="Saved">Order category created.</Alert>
          <Alert tone="warning" title="Heads up">Low wallet balance.</Alert>
          <Alert tone="error" title="Failed">Payment declined.</Alert>
          <Alert tone="info">Dispatch started.</Alert>
        </VStack>
      </Section>

      <Section title="Form controls">
        <VStack gap={4} className="max-w-sm">
          <Input label="Email" placeholder="you@airwaste.io" defaultValue="collector@airwaste.io" />
          <TextArea label="Notes" placeholder="Add a note..." />
          <Select
            label="Category"
            defaultValue="kg"
            options={[
              { label: 'Plastic (kg)', value: 'kg' },
              { label: 'Paper (kg)', value: 'paper' },
              { label: 'Glass (kg)', value: 'glass' },
            ]}
          />
          <Checkbox label="Notify me on pickup" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <Radio label="Option A" name="r" checked={radio === 'a'} onChange={() => setRadio('a')} />
          <Radio label="Option B" name="r" checked={radio === 'b'} onChange={() => setRadio('b')} />
          <Switch label="Available for dispatch" checked={switchOn} onChange={(e) => setSwitchOn(e.target.checked)} />
        </VStack>
      </Section>

      <Section title="Avatars & Spinners">
        <Avatar name="Budi Santoso" />
        <Avatar name="Ana" size="lg" />
        <Avatar src="https://i.pravatar.cc/100?img=12" />
        <Spinner />
        <Spinner size="lg" />
      </Section>

      <Section title="Layout & Modal">
        <HStack gap={4}>
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="ghost" onClick={() => setModalOpen(true)}>Show dialog</Button>
        </HStack>
      </Section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm dispatch"
        footer={
          <HStack gap={3} justify="end">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
          </HStack>
        }
      >
        <p className="text-sm text-neutral-600">Assign this order to the nearest verified collector?</p>
      </Modal>

      <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-400">
        Built with @airwaste/design-system-web · brand tokens from the AirWaste logo.
      </footer>
    </div>
  );
}
