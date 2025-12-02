import * as React from "react";
import { getMessagesFormatter } from "@vtrphan/dx-core";
import {
  Getter,
  Template,
  Plugin,
  TemplateConnector,
  Getters
} from "@vtrphan/dx-react-core";
import {
  TABLE_EDIT_COMMAND_TYPE,
  tableColumnsWithEditing,
  isHeadingEditCommandsTableCell,
  isEditCommandsTableCell,
  isAddedTableRow,
  isEditTableRow
} from "@vtrphan/dx-grid-core";
import { TableEditColumnProps, TableCellProps } from "../types";

const pluginDependencies = [{ name: "EditingState" }, { name: "Table" }];

const defaultMessages = {
  addCommand: "New",
  editCommand: "Edit",
  deleteCommand: "Delete",
  commitCommand: "Save",
  cancelCommand: "Cancel"
};

const TableEditColumnBase: React.FC<TableEditColumnProps> & {
  COLUMN_TYPE?: symbol;
  components?: typeof TableEditColumnComponents;
} = ({
  cellComponent: Cell,
  headerCellComponent: HeaderCell,
  commandComponent: Command,
  showAddCommand = false,
  showEditCommand = false,
  showDeleteCommand = false,
  width = 140,
  messages = {}
}) => {
  const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
  const tableColumnsComputed = ({ tableColumns }: Getters) =>
    tableColumnsWithEditing(tableColumns, width);

  return (
    <Plugin name="TableEditColumn" dependencies={pluginDependencies}>
      <Getter name="tableColumns" computed={tableColumnsComputed} />

      <Template
        name="tableCell"
        predicate={({ tableRow, tableColumn }: any) =>
          isHeadingEditCommandsTableCell(tableRow, tableColumn)
        }
      >
        {(params: TableCellProps) => (
          <TemplateConnector>
            {(getters, actions) => (
              <HeaderCell {...params}>
                {showAddCommand && (
                  <Command
                    id="add"
                    text={getMessage("addCommand")}
                    onExecute={() => actions.addRow()}
                  />
                )}
              </HeaderCell>
            )}
          </TemplateConnector>
        )}
      </Template>
      <Template
        name="tableCell"
        predicate={({ tableRow, tableColumn }: any) =>
          isEditCommandsTableCell(tableRow, tableColumn)
        }
      >
        {(params: TableCellProps) => (
          <TemplateConnector>
            {(getters, actions) => {
              const isEdit = isEditTableRow(params.tableRow);
              const isNew = isAddedTableRow(params.tableRow);
              const isEditing = isEdit || isNew;
              const rowIds = [params.tableRow.rowId];
              return (
                <Cell {...params} row={params.tableRow.row}>
                  {showEditCommand && !isEditing && (
                    <Command
                      id="edit"
                      text={getMessage("editCommand")}
                      onExecute={() => actions.startEditRows({ rowIds })}
                    />
                  )}
                  {showDeleteCommand && !isEditing && (
                    <Command
                      id="delete"
                      text={getMessage("deleteCommand")}
                      onExecute={() => {
                        actions.deleteRows({ rowIds });
                        actions.commitDeletedRows({ rowIds });
                      }}
                    />
                  )}
                  {isEditing && (
                    <Command
                      id="commit"
                      text={getMessage("commitCommand")}
                      onExecute={() => {
                        if (isNew) {
                          actions.commitAddedRows({ rowIds });
                        } else {
                          actions.stopEditRows({ rowIds });
                          actions.commitChangedRows({ rowIds });
                        }
                      }}
                    />
                  )}
                  {isEditing && (
                    <Command
                      id="cancel"
                      text={getMessage("cancelCommand")}
                      onExecute={() => {
                        if (isNew) {
                          actions.cancelAddedRows({ rowIds });
                        } else {
                          actions.stopEditRows({ rowIds });
                          actions.cancelChangedRows({ rowIds });
                        }
                      }}
                    />
                  )}
                </Cell>
              );
            }}
          </TemplateConnector>
        )}
      </Template>
    </Plugin>
  );
};

const TableEditColumnComponents = {
  cellComponent: "Cell",
  headerCellComponent: "HeaderCell",
  commandComponent: "Command"
} as const;

TableEditColumnBase.COLUMN_TYPE = TABLE_EDIT_COMMAND_TYPE;
TableEditColumnBase.components = TableEditColumnComponents;

/***
 * A plugin that renders a command column. This column contains controls used for row editing,
 * creating, or deleting and committing/canceling changes.
 * */
export const TableEditColumn: React.ComponentType<TableEditColumnProps> & {
  /** The edit column type's identifier. */
  COLUMN_TYPE: symbol;
} = TableEditColumnBase as typeof TableEditColumnBase & {
  COLUMN_TYPE: symbol;
};
