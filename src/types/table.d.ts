import "@tanstack/react-table";
declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends object, TValue> {
    width?: string;
  }
}
