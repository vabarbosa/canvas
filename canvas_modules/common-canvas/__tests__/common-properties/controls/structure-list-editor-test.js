/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import StructureListEditorControl from "../../../src/common-properties/editor-controls/structure-list-editor-control.jsx";
import SubPanelButton from "../../../src/common-properties/editor-panels/sub-panel-button.jsx";
import { mountWithIntl } from "enzyme-react-intl";
import { ReactWrapper } from "enzyme";
import { expect } from "chai";
import Controller from "../../../src/common-properties/properties-controller";
import propertyUtils from "../../_utils_/property-utils";
import isEqual from "lodash/isEqual";

import structureListEditorParamDef from "../../test_resources/paramDefs/structurelisteditor_paramDef.json";

const CONDITIONS_TEST_FORM_DATA = require("../../test_resources/json/conditions-test-formData.json");

const controller = new Controller();

const control = {
	"name": "structurelisteditorList",
	"label": {
		"text": "structurelisteditorList"
	},
	"controlType": "structurelisteditor",
	"valueDef": {
		"propType": "structure",
		"isList": true,
		"isMap": false,
		"defaultValue": []
	},
	"separateLabel": true,
	"addRemoveRows": true,
	"subControls": [
		{
			"name": "name",
			"label": {
				"text": "Name"
			},
			"controlType": "textfield",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false
			},
			"role": "new_column",
			"filterable": true,
			"visible": true,
			"width": 20,
			"editStyle": "subpanel"
		},
		{
			"name": "description",
			"label": {
				"text": "Description"
			},
			"controlType": "textfield",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false
			},
			"role": "new_column",
			"sortable": true,
			"visible": true,
			"width": 20,
			"editStyle": "subpanel"
		},
		{
			"name": "readonly",
			"label": {
				"text": "ReadOnly"
			},
			"controlType": "readonly",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false
			},
			"visible": true,
			"width": 20,
			"editStyle": "inline"
		}
	],
	"keyIndex": -1,
	"defaultRow": [
		null,
		null
	],
	"childItem": {
		"itemType": "additionalLink",
		"panel": {
			"id": "structurelisteditorListInput",
			"panelType": "general",
			"uiItems": [
				{
					"itemType": "control",
					"control": {
						"name": "name",
						"label": {
							"text": "Name"
						},
						"controlType": "textfield",
						"valueDef": {
							"propType": "string",
							"isList": false,
							"isMap": false
						},
						"filterable": true,
						"separateLabel": true
					}
				},
				{
					"itemType": "control",
					"control": {
						"name": "description",
						"label": {
							"text": "Description"
						},
						"controlType": "textfield",
						"valueDef": {
							"propType": "string",
							"isList": false,
							"isMap": false
						},
						"sortable": true,
						"separateLabel": true
					}
				}
			]
		},
		"text": "...",
		"secondaryText": "structurelisteditorListInput"
	},
	"moveableRows": true,
	"required": true
};

const propertyId = { name: "keys" };

function setPropertyValue() {
	controller.setPropertyValues(
		{ "keys": [
			["Hello", "World", "Hello World"],
			["one", "two", "one or two"],
			["apple", "orange", "apple or orange"],
			["ford", "honda", "for or honda"],
			["BP", "Ascending", "BP ascending"],
			["Cholesterol", "Ascending", "Cholesterol Ascending"]
		] }
	);
}

function getSelectedRows(controlName) {
	return [];
}

function getSelectedRowsTop(controlName) {
	return [0];
}

function getSelectedRowsBottom(controlName) {
	return [5];
}

function getSelectedRowsMiddle(controlName) {
	return [2];
}

function updateSelectedRows(row) {
	return [];
}

function genUIItem() {
	const key = "panel.___structurelisteditorList_";
	const label = "...";
	const title = "sub-panel-button.___structurelisteditorList_";
	const subPanel = (<div id={key}
		className="control-panel"
		key={key}
	/>);

	const panel = (<SubPanelButton id={"sub-panel-button.___structurelisteditorList_"}
		label={label}
		title={title}
		panel={subPanel}
		controller={controller}
	/>);
	return (<SubPanelButton id={"sub-panel-button.___structurelisteditorList_"}
		label={label}
		title={title}
		panel={panel}
		controller={controller}
	/>);
}


describe("StructureListEditorControl renders correctly", () => {

	it("props should have been defined", () => {
		setPropertyValue();
		const selectedRows = getSelectedRows();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={selectedRows}
				buildUIItem={genUIItem}
			/>
		);

		expect(wrapper.prop("control")).to.equal(control);
		expect(wrapper.prop("controller")).to.equal(controller);
		expect(wrapper.prop("propertyId")).to.equal(propertyId);
		expect(wrapper.prop("selectedRows")).to.equal(selectedRows);
		expect(wrapper.prop("buildUIItem")).to.equal(genUIItem);
	});

	it("should render a `StructureListEditorControl`", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRows()}
				buildUIItem={genUIItem}
			/>
		);

		expect(wrapper.find("#structure-table")).to.have.length(1);
		const buttons = wrapper.find("#structure-list-editor-table-buttons");
		expect(buttons).to.have.length(1);
		const tableContent = wrapper.find(".structure-table-content-row");
		expect(tableContent).to.have.length(1);
		expect(tableContent.find("#table-row-move-button-container")).to.have.length(1);
		expect(tableContent.find(".table-row-move-button-disable")).to.have.length(4);
		// checks to see of readonly controls are rendered
		expect(tableContent.find(".editor_control_readonly")).to.have.length(6);
	});

	it("should select no rows and all move buttons disabled `StructureListEditorControl`", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRows()}
				buildUIItem={genUIItem}
			/>
		);

		// validate the proper buttons are enabled/disabled
		const buttonContainer = wrapper.find("#table-row-move-button-container").find("div");
		expect(buttonContainer).to.have.length(3);
		expect(buttonContainer.at(1).find(".table-row-move-button-disable")).to.have.length(2);
		expect(buttonContainer.at(2).find(".table-row-move-button-disable")).to.have.length(2);
	});

	it("should select top row and move down one row", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsTop()}
				buildUIItem={genUIItem}
			/>
		);

		// select the first row in the table
		let tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		let tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.first().simulate("click");

		// validate the proper buttons are enabled/disabled
		const buttonContainer = wrapper.find("#table-row-move-button-container").find("div");
		expect(buttonContainer).to.have.length(5);
		expect(buttonContainer.at(1).find(".table-row-move-button-disable")).to.have.length(2);
		expect(buttonContainer.at(2).find(".table-row-move-button")).to.have.length(2);
		buttonContainer.at(3).simulate("click");

		// validate the first row is moved
		tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		expect(tableData.at(0).children()
			.at(0)
			.text()).to.equal("one");
		expect(tableData.at(1).children()
			.at(0)
			.text()).to.equal("Hello");
	});

	it("should select top row and move down to bottom row", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsTop()}
				buildUIItem={genUIItem}
			/>
		);

		// select the first row in the table
		let tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		let tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.first().simulate("click");

		// validate the proper buttons are enabled/disabled
		const buttonContainer = wrapper.find("#table-row-move-button-container").find("div");
		expect(buttonContainer).to.have.length(5);
		expect(buttonContainer.at(1).find(".table-row-move-button-disable")).to.have.length(2);
		expect(buttonContainer.at(2).find(".table-row-move-button")).to.have.length(2);
		buttonContainer.at(4).simulate("click");

		// validate the first row is moved
		tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		expect(tableData.at(0).children()
			.at(0)
			.text()).to.equal("one");
		expect(tableData.at(5).children()
			.at(0)
			.text()).to.equal("Hello");
	});

	it("should select bottom row and move up one row", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsBottom()}
				buildUIItem={genUIItem}
			/>
		);

		// select the last row in the table
		let tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		let tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.at(5).simulate("click");

		// validate the proper buttons are enabled/disabled
		const buttonContainer = wrapper.find("#table-row-move-button-container").find("div");
		expect(buttonContainer).to.have.length(5);
		expect(buttonContainer.at(1).find(".table-row-move-button")).to.have.length(2);
		expect(buttonContainer.at(4).find(".table-row-move-button-disable")).to.have.length(2);
		buttonContainer.at(3).simulate("click");

		// validate the first row is moved
		tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		expect(tableData.at(4).children()
			.at(0)
			.text()).to.equal("Cholesterol");
		expect(tableData.at(5).children()
			.at(0)
			.text()).to.equal("BP");
	});

	it("should select bottom row and move up to top row", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsBottom()}
				buildUIItem={genUIItem}
			/>
		);

		// select the last row in the table
		let tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		let tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.at(5).simulate("click");

		// validate the proper buttons are enabled/disabled
		const buttonContainer = wrapper.find("#table-row-move-button-container").find("div");
		expect(buttonContainer).to.have.length(5);
		expect(buttonContainer.at(1).find(".table-row-move-button")).to.have.length(2);
		expect(buttonContainer.at(4).find(".table-row-move-button-disable")).to.have.length(2);
		buttonContainer.at(2).simulate("click");

		// validate the last row is moved
		tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		expect(tableData.at(0).children()
			.at(0)
			.text()).to.equal("Cholesterol");
		expect(tableData.at(5).children()
			.at(0)
			.text()).to.equal("BP");
	});

	it("should select top row and correct move buttons enabled `StructureListEditorControl`", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsTop()}
				buildUIItem={genUIItem}
			/>
		);

		// select the first row in the table
		const tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		const tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.first().simulate("click");

		// validate the proper buttons are enabled/disabled
		const buttonContainer = wrapper.find("#table-row-move-button-container").find("div");
		expect(buttonContainer).to.have.length(5);
		expect(buttonContainer.at(1).find(".table-row-move-button-disable")).to.have.length(2);
		expect(buttonContainer.at(2).find(".table-row-move-button")).to.have.length(2);
	});

	it("should select bottom row and correct move buttons enabled `StructureListEditorControl`", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsBottom()}
				buildUIItem={genUIItem}
			/>
		);

		// select the first row in the table
		const tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		const tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.last().simulate("click");

		// validate the proper buttons are enabled/disabled
		const buttonContainer = wrapper.find("#table-row-move-button-container").find("div");
		expect(buttonContainer).to.have.length(5);
		expect(buttonContainer.at(1).find(".table-row-move-button")).to.have.length(2);
		expect(buttonContainer.at(4).find(".table-row-move-button-disable")).to.have.length(2);
	});

	it("should select middle row and all move buttons enabled `StructureListEditorControl`", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsMiddle()}
				buildUIItem={genUIItem}
			/>
		);

		// select the first row in the table
		const tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		const tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.at(2).simulate("click");

		// validate the proper buttons are enabled/disabled
		const buttonContainer = wrapper.find("#table-row-move-button-container").find("div");
		expect(buttonContainer).to.have.length(7);
		expect(buttonContainer.at(1).find(".table-row-move-button")).to.have.length(2);
		expect(buttonContainer.at(4).find(".table-row-move-button")).to.have.length(2);
	});

	it("should select add row button and new row should display", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsTop()}
				buildUIItem={genUIItem}
			/>
		);

		// select the add column button
		const addColumnButton = wrapper.find("#add-fields-button");
		expect(addColumnButton).to.have.length(1);
		addColumnButton.simulate("click");

		// The table content should increase by 1
		const tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		const tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(7);

	});

	it("should select row and remove button row should be removed", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsTop()}
				buildUIItem={genUIItem}
			/>
		);

		// ensure the remove column button is disabled
		const removeColumnButton = wrapper.find("#remove-fields-button-disabled");
		expect(removeColumnButton).to.have.length(1);

		// select the first row in the table
		var tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		var tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(6);
		tableData.at(2).simulate("click");

		// ensure removed button is enabled and select it
		const enabledRemoveColumnButton = wrapper.find("#remove-fields-button-enabled");
		expect(enabledRemoveColumnButton).to.have.length(1);
		expect(enabledRemoveColumnButton.prop("id")).to.equal("remove-fields-button-enabled");
		enabledRemoveColumnButton.simulate("click");

		// validate the first row is deleted
		tableBody = wrapper.find("#flexible-table-container");
		expect(tableBody).to.have.length(1);
		tableData = tableBody.find(".reactable-data").children();
		expect(tableData).to.have.length(5);
		expect(tableData.at(0).children()
			.at(0)
			.text()).to.equal("one");
	});

	it("should search correct keyword in table", () => {
		setPropertyValue();
		const wrapper = mountWithIntl(
			<StructureListEditorControl
				control={control}
				controller={controller}
				propertyId={propertyId}
				updateSelectedRows={updateSelectedRows}
				selectedRows={getSelectedRowsTop()}
				buildUIItem={genUIItem}
			/>
		);
		const input = wrapper.find("#flexible-table-search");
		input.simulate("change", { target: { value: "one" } });
		expect(wrapper.find(".table-row")).to.have.length(1);
		input.simulate("change", { target: { value: "ONE" } });
		expect(wrapper.find(".table-row")).to.have.length(1);

	});
});

describe("condition messages renders correctly with structurelisteditor table", () => {
	it("structurelisteditor control should have error message when notEquals []", () => {
		const wrapper = propertyUtils.createEditorForm("mount", CONDITIONS_TEST_FORM_DATA, controller);
		const conditionsPropertyId = { name: "structurelisteditorTableInput" };
		const input = wrapper.find("#editor-control-structurelisteditorTableInput");
		expect(input).to.have.length(1);
		expect(controller.getPropertyValue(conditionsPropertyId)).to.have.length(1);

		expect(wrapper.find(".validation-warning-message-icon-structure-list-editor")).to.have.length(0);
		expect(wrapper.find(".validation-error-message-color-warning")).to.have.length(0);
		// const dataRows = input.find(".public_fixedDataTable_bodyRow");
		const dataRows = input.find(".table-row");
		expect(dataRows).to.have.length(1);
		dataRows.first().simulate("click");
		wrapper.update();
		const removeRowButton = wrapper.find("#remove-fields-button-enabled");
		expect(removeRowButton).to.have.length(1);

		removeRowButton.simulate("click");
		wrapper.update();
		expect(controller.getPropertyValue(conditionsPropertyId)).to.have.length(0);

		expect(wrapper.find(".validation-warning-message-icon-structure-list-editor")).to.have.length(1);
		expect(wrapper.find(".validation-error-message-color-warning")).to.have.length(1);
	});
});

describe("should render with CommonProperties element", () => {
	var wrapper;
	var renderedController;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(structureListEditorParamDef);
		wrapper = renderedObject.wrapper;
		renderedController = renderedObject.controller;
	});

	afterEach(() => {
		wrapper.unmount();
	});
	it("table does not render with add-remove buttons", () => {
		const tableSummary = wrapper.find(".control-summary-link-buttons").at(2); // Summary link Configure Inline Editing Table
		tableSummary.find("a").simulate("click"); // open the summary panel (modal)
		const tableHtml = document.getElementById("flexible-table-inlineEditingTableNoButtons"); // needed since modal dialogs are outside `wrapper`
		const noButtonTable = new ReactWrapper(tableHtml, true);
		const addButtons = noButtonTable.find("#field-picker-buttons-container");
		expect(addButtons).to.have.length(0);
	});

	it("only allow integer values in integer numberfield cell", () => {
		const tableSummary = wrapper.find(".control-summary-link-buttons").at(1); // Summary link Configure No Add Buttons Inline Editing Table
		tableSummary.find("a").simulate("click"); // open the summary panel (modal)
		const tableHtml = document.getElementById("flexible-table-inlineEditingTable"); // needed since modal dialogs are outside `wrapper`
		const inlineEditTable = new ReactWrapper(tableHtml, true);
		const integerCell = inlineEditTable.find("#editor-control-valueName");
		expect(integerCell).to.have.length(1);
		expect(integerCell.prop("value")).to.equal("1");
		// enter a valid integer
		integerCell.simulate("change", { target: { value: "2" } });
		expect(integerCell.prop("value")).to.equal("2");

		// enter an invalid integer
		integerCell.simulate("change", { target: { value: "2.3" } });
		expect(integerCell.prop("value")).to.equal("2");
	});

	it("only allow double values in double numberfield cell", () => {
		const tableSummary = wrapper.find(".control-summary-link-buttons").at(1); // Summary link Configure No Add Buttons Inline Editing Table
		tableSummary.find("a").simulate("click"); // open the summary panel (modal)
		const tableHtml = document.getElementById("flexible-table-inlineEditingTable"); // needed since modal dialogs are outside `wrapper`
		const inlineEditTable = new ReactWrapper(tableHtml, true);
		const doubleCell = inlineEditTable.find("#editor-control-doubleName");
		expect(doubleCell).to.have.length(1);
		expect(doubleCell.prop("value")).to.equal("1.234");

		// enter a valid double integer
		doubleCell.simulate("change", { target: { value: "2.3" } });
		expect(doubleCell.prop("value")).to.equal("2.3");
	});

	it("warning message generated when editing numberfield cell", () => {
		const tableSummary = wrapper.find(".control-summary-link-buttons").at(3); // Summary link Configure Warning Inline Editing Table
		tableSummary.find("a").simulate("click"); // open the summary panel (modal)
		const tableHtml = document.getElementById("flexible-table-inlineEditingTableWarning"); // needed since modal dialogs are outside `wrapper`
		const inlineEditTable = new ReactWrapper(tableHtml, true);
		const integerCell = inlineEditTable.find("#editor-control-valueName");
		expect(integerCell).to.have.length(1);
		expect(integerCell.prop("value")).to.equal("1");
		// enter a valid integer
		integerCell.simulate("change", { target: { value: "3" } });
		expect(integerCell.prop("value")).to.equal("3");
		wrapper.update();

		const numberfieldSeedErrorMessages = {
			"type": "warning",
			"text": "field1 should not equal 3",
		};
		const actual = renderedController.getErrorMessage({ name: "inlineEditingTableWarning" });
		expect(isEqual(JSON.parse(JSON.stringify(numberfieldSeedErrorMessages)),
			JSON.parse(JSON.stringify(actual)))).to.be.true;
		expect(inlineEditTable.find(".validation-error-message-icon")).to.have.length(1);
		expect(inlineEditTable.find(".form__validation--warning")).to.have.length(1);
	});

	it("error message generated on OR condition when editing numberfield cell", () => {
		const tableSummary = wrapper.find(".control-summary-link-buttons").at(5); // Summary link Configure OR Error Inline Editing Table
		tableSummary.find("a").simulate("click"); // open the summary panel (modal)
		const tableHtml = document.getElementById("flexible-table-inlineEditingTableError2"); // needed since modal dialogs are outside `wrapper`
		const inlineEditTable = new ReactWrapper(tableHtml, true);
		const doubleCell = inlineEditTable.find("#editor-control-doubleName");
		expect(doubleCell).to.have.length(1);
		expect(doubleCell.prop("value")).to.equal("1.234");

		// enter a valid double integer
		doubleCell.simulate("change", { target: { value: "2.3" } });
		expect(doubleCell.prop("value")).to.equal("2.3");
		wrapper.update();

		const numberfieldSeedErrorMessages = {
			"type": "error",
			"text": "fields are 2 or 2.3",
		};
		const actual = renderedController.getErrorMessage({ name: "inlineEditingTableError2" });
		expect(isEqual(JSON.parse(JSON.stringify(numberfieldSeedErrorMessages)),
			JSON.parse(JSON.stringify(actual)))).to.be.true;
		expect(inlineEditTable.find(".validation-error-message-icon")).to.have.length(1);
		expect(inlineEditTable.find(".form__validation--error")).to.have.length(1);
	});

	it("error message generated on AND condition when editing numberfield cell", () => {
		const tableSummary = wrapper.find(".control-summary-link-buttons").at(4); // Summary link Configure OR Error Inline Editing Table
		tableSummary.find("a").simulate("click"); // open the summary panel (modal)
		const tableHtml = document.getElementById("flexible-table-inlineEditingTableError"); // needed since modal dialogs are outside `wrapper`
		const inlineEditTable = new ReactWrapper(tableHtml, true);
		const doubleCell = inlineEditTable.find("#editor-control-doubleName");
		expect(doubleCell).to.have.length(1);
		expect(doubleCell.prop("value")).to.equal("1.234");
		const integerCell = inlineEditTable.find("#editor-control-valueName");
		expect(integerCell).to.have.length(1);
		expect(integerCell.prop("value")).to.equal("1");
		// enter a valid integer
		integerCell.simulate("change", { target: { value: "2" } });
		expect(integerCell.prop("value")).to.equal("2");

		// enter a valid double integer
		doubleCell.simulate("change", { target: { value: "2.3" } });
		expect(doubleCell.prop("value")).to.equal("2.3");
		wrapper.update();

		const numberfieldSeedErrorMessages = {
			"type": "error",
			"text": "fields are 2 and 2.3",
		};
		const actual = renderedController.getErrorMessage({ name: "inlineEditingTableError" });
		expect(isEqual(JSON.parse(JSON.stringify(numberfieldSeedErrorMessages)),
			JSON.parse(JSON.stringify(actual)))).to.be.true;
		expect(inlineEditTable.find(".validation-error-message-icon")).to.have.length(1);
		expect(inlineEditTable.find(".form__validation--error")).to.have.length(1);
	});
});