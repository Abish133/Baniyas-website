'use client';

import { useState } from 'react';
import Field, { CharCounter } from './Field';
import { useFormField } from './AdminForm';

function parseList(value, fallback) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      /* ignore */
    }
  }
  return fallback;
}

function move(list, from, to) {
  if (to < 0 || to >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

function RowButtons({ index, count, onMove, onRemove }) {
  return (
    <div className="btn-group btn-group-sm repeater__buttons">
      <button type="button" className="btn btn-outline-secondary" onClick={() => onMove(index, index - 1)} disabled={index === 0} title="Move up">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
      <button type="button" className="btn btn-outline-secondary" onClick={() => onMove(index, index + 1)} disabled={index === count - 1} title="Move down">
        <i className="fa-solid fa-arrow-down"></i>
      </button>
      <button type="button" className="btn btn-outline-danger" onClick={() => onRemove(index)} title="Remove">
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}

/** List of short texts, posted as a JSON array in a hidden input. */
export function ListField({ name, label, help, max = 10, itemMaxLength = 200, placeholder }) {
  const { error, value } = useFormField(name);
  const [items, setItems] = useState(() => parseList(value, []));

  return (
    <Field label={label} help={help} error={error} counter={<small className="text-muted">{items.length}/{max}</small>}>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="repeater">
        {items.map((item, index) => (
          <div className="repeater__row" key={index}>
            <span className="repeater__index">{index + 1}</span>
            <div className="flex-grow-1">
              <input
                className="form-control"
                value={item}
                maxLength={itemMaxLength}
                minLength={3}
                required
                placeholder={placeholder}
                onChange={(e) => setItems(items.map((it, i) => (i === index ? e.target.value : it)))}
              />
              <div className="text-end">
                <CharCounter length={item.length} max={itemMaxLength} />
              </div>
            </div>
            <RowButtons index={index} count={items.length} onMove={(a, b) => setItems(move(items, a, b))} onRemove={(i) => setItems(items.filter((_, j) => j !== i))} />
          </div>
        ))}
        <button type="button" className="btn btn-sm btn-outline-primary" disabled={items.length >= max} onClick={() => setItems([...items, ''])}>
          <i className="fa-solid fa-plus me-1"></i>Add item
        </button>
      </div>
    </Field>
  );
}

/** Question/answer pairs, posted as a JSON array in a hidden input. */
export function FaqField({ name, label, help, max = 10, questionMax = 200, answerMax = 1000 }) {
  const { error, value } = useFormField(name);
  const [items, setItems] = useState(() => parseList(value, []));
  const update = (index, key, text) => setItems(items.map((it, i) => (i === index ? { ...it, [key]: text } : it)));

  return (
    <Field label={label} help={help} error={error} counter={<small className="text-muted">{items.length}/{max}</small>}>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="repeater">
        {items.map((item, index) => (
          <div className="repeater__row repeater__row--card" key={index}>
            <span className="repeater__index">{index + 1}</span>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <label className="form-label small mb-1">Question</label>
                <CharCounter length={item.question.length} max={questionMax} />
              </div>
              <input className="form-control mb-2" value={item.question} maxLength={questionMax} minLength={5} required onChange={(e) => update(index, 'question', e.target.value)} />
              <div className="d-flex justify-content-between">
                <label className="form-label small mb-1">Answer</label>
                <CharCounter length={item.answer.length} max={answerMax} />
              </div>
              <textarea className="form-control" rows={3} value={item.answer} maxLength={answerMax} minLength={5} required onChange={(e) => update(index, 'answer', e.target.value)} />
            </div>
            <RowButtons index={index} count={items.length} onMove={(a, b) => setItems(move(items, a, b))} onRemove={(i) => setItems(items.filter((_, j) => j !== i))} />
          </div>
        ))}
        <button type="button" className="btn btn-sm btn-outline-primary" disabled={items.length >= max} onClick={() => setItems([...items, { question: '', answer: '' }])}>
          <i className="fa-solid fa-plus me-1"></i>Add question
        </button>
      </div>
    </Field>
  );
}
