// not needed but it's there to define the fields type in MetaData
type Field = {
    name: string,
    tableID: number,
    columnID: number,
    dataTypeID: number,
    dataTypeSize: number,
    dataTypeModifier: number,
    format: string
};

export type MetaData = {
    command: string,
    rowCount: number,
    oid: null,
    rows: unknown[],
    fields: Field[] | []
};

export type QueryObject = {
    query: string;
    queryDeets: (string | MetaData)[];
};

export type ResponseData = {
    metadata: MetaData[] | MetaData | number;
};