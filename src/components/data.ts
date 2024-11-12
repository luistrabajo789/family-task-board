import { ColumnData } from "./Board";

export type PersonT = "Luis Miguel" | "Michel Viera" | "Sara Zuleta" | string;
export const assignees: PersonT[] = [
  "Luis Miguel",
  "Michel Viera",
  "Sara Zuleta",
];

export const initialData: ColumnData[] = [
  {
    id: "1",
    title: "Por Hacer",
    tasks: [
      {
        id: "1",
        content: "Recoger popo Perras - MAÑANA",
        assignedTo: "Sara Zuleta",
      },
      {
        id: "2",
        content: "Tender ambas camas - MAÑANA",
        assignedTo: "Luis Miguel",
      },
      {
        id: "3",
        content: "Acomdar cosas en su lugar - MAÑANA",
        assignedTo: "Sara Zuleta",
      },
      {
        id: "4",
        content: "Barrer casa completa - TARDE",
        assignedTo: "Michel Viera",
      },
      {
        id: "5",
        content: "Trapear casa completa - TARDE",
        assignedTo: "Michel Viera",
      },
      {
        id: "6",
        content: "Hacer desayuno - MAÑANA",
        assignedTo: "Luis Miguel",
      },
      {
        id: "7",
        content: "Lavar los platos Desayuno - MAÑANA",
        assignedTo: "Luis Miguel",
      },

      {
        id: "8",
        content: "Hacer Almuerzo - MAÑANA",
        assignedTo: "Luis Miguel",
      },
      {
        id: "9",
        content: "Lavar los platos Almuerzo",
        assignedTo: "Luis Miguel",
      },

      {
        id: "10",
        content: "Sacar la basura MARTES Y SABADO",
        assignedTo: "Luis Miguel",
      },

      {
        id: "11",
        content: "Hacer Comida - TARDE",
        assignedTo: "Luis Miguel",
      },
      {
        id: "12",
        content: "Lavar los platos Comida - TARDE",
        assignedTo: "Sara Zuleta",
      },
      {
        id: "13",
        content: "Recoger perras noche - NOCHE",
        assignedTo: "Sara Zuleta",
      },
      {
        id: "14",
        content:
          "Preparar todo para mañana colegio (uniforme - tareas - utiles )",
        assignedTo: "Sara Zuleta",
      },

      {
        id: "15",
        content: "Lavar baño Miercoles",
        assignedTo: "Luis Miguel",
      },
    ],
  },
  { id: "2", title: "En Proceso", tasks: [] },
  { id: "3", title: "Hecho", tasks: [] },
];
