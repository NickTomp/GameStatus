export const prismaErrors: Record<string, { status: number; message: string }> = {
    P2002: { status: 400, message: "DataBase: Unique defenition already exists!" },
    P2025: { status: 404, message: "DataBase: Not found" },
    P2003: { status: 400, message: "DataBase: Relation constraint violation" },
};