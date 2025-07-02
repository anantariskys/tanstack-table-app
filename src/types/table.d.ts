import "@tanstack/react-table";
declare module "@tanstack/table-core" {
  interface ColumnMeta<_TData extends object, _TValue> {
    width?: string;
  }
}
