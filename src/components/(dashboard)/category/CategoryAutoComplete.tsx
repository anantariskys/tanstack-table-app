import { Autocomplete, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getCategories } from '@/services/categories/getCategories';
import { Category } from '@/schemas/categories';

type CategoryAutocompleteProps = {
  value: number | null;
  onChange: (value: number | null) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function CategoryAutocomplete({
  value,
  onChange,
  error,
  label = 'Category',
  placeholder = 'Search category',
  disabled = false,
}: CategoryAutocompleteProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getCategories({ limit: 1000 });
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  // Sync input label with value when categories or value change
  useEffect(() => {
    if (!value) return;

    const selected = categories.find((cat) => cat.id === value);
    if (selected && selected.name !== input) {
      setInput(selected.name || '');
    }
  }, [value, categories, input]);

  const handleChange = (val: string) => {
    setInput(val);

    const match = categories.find((c) => c.name === val);
    if (match) {
      onChange(match.id);
    } else {
      onChange(null);
    }
  };

  return (
    <Autocomplete
      label={label}
      placeholder={placeholder}
      data={categories.map((cat) => cat.name || '')}
      value={input}
      onChange={handleChange}
      error={error}
      disabled={disabled}
      rightSection={loading ? <Loader size="xs" /> : null}
      clearable
    />
  );
}
