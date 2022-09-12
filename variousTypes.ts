type Field = {
    name: string,
    tableID: number,
    columnID: number,
    dataTypeID: number,
    dataTypeSize: number,
    dataTypeModifier: number,
    format: string
};

type MetaData = {
    command: string,
    rowCount: number,
    oid: null,
    rows: unknown[],
    fields: Field[] | []
}

export type ResponseData = {
    metadata: MetaData | number;
};