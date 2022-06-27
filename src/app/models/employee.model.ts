export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    position: string,
    birthdate: Date,
    manager: number
}

export interface EmployeeUI extends Employee {
    managingEmployees: EmployeeUI[]
}