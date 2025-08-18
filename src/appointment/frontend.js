/**
 * frontend.js
 * Mounts a DateTimePicker for each `.datetime-picker-trigger` without replacing the whole form.
 */
import { DateTimePicker, Modal } from '@wordpress/components';
import { render, useState } from '@wordpress/element';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.datetime-picker-trigger').forEach((origInput) => {
    // Read attributes from the original input
    const initialDate = origInput.dataset.initialDate || '';
    const name = origInput.getAttribute('name') || 'datetime';
    const isRequired = origInput.hasAttribute('required');

    // Create a mount node and replace ONLY the original input element
    const mountNode = document.createElement('div');
    mountNode.className = 'datetime-picker-root';
    origInput.parentNode.replaceChild(mountNode, origInput);

    // React component that renders a visible field + hidden field for form submission
    const Picker = () => {
      const [isOpen, setOpen] = useState(false);
      const [date, setDate] = useState(initialDate || '');

      function formatHuman(dateInput) {
        if (!dateInput) return '';
        const d = new Date(dateInput);
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
        return `${d.toLocaleDateString('en-US', optionsDate)} - ${d.toLocaleTimeString('en-US', optionsTime)}`;
      }

      return (
        <>
          {/* Visible, read-only field for users */}
          <input
            type="text"
            className="datetime-picker-visible"
            value={date ? formatHuman(date) : ''}
            placeholder={!date ? 'Select Date & Time' : undefined}
            readOnly
            onClick={() => setOpen(true)}
          />

          {/* Hidden field that actually gets submitted */}
          <input
            type="hidden"
            name={name}
            value={date || ''}
            required={isRequired}
          />

          {/* Modal + DateTimePicker */}
          {isOpen && (
            <Modal title="Pick a Date & Time" onRequestClose={() => setOpen(false)}>
              <DateTimePicker
                currentDate={date ? new Date(date) : new Date()}
                onChange={(newDate) => {
                  // DateTimePicker returns a string (ISO), store it
                  setDate(newDate);
                }}
                is12Hour
              />

              {/* Small UI for closing modal (optional — Modal also closes on overlay/esc) */}
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <button type="button" onClick={() => setOpen(false)}>Done</button>
              </div>
            </Modal>
          )}
        </>
      );
    };

    // Render only into the mount node
    render(<Picker />, mountNode);
  });
});
