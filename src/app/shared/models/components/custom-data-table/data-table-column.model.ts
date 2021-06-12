import { ColumnType } from "./columns.enum";

export interface DataTableColumn{
    header: string;
    prop: string;
    type: ColumnType;
    customCellAction?: (value: any) => any;
    editCellAction?: (value: any) => any;
    removeCellAction?: (value: any) => any;
}