/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

// import logger from "../../../utils/logger";
import React from "react";
import { FormControl } from "react-bootstrap";
import Dropdown from "react-dropdown";
import EditorControl from "./editor-control.jsx";
import ReactDOM from "react-dom";

var _ = require("underscore");

export default class FieldAllocatorControl extends EditorControl {
	constructor(props) {
		super(props);
		this.state = {
			controlValue: props.valueAccessor(props.control.name),
			selectedValues: []
		};

		this._update_callback = null;

		this.getControlValue = this.getControlValue.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getSelectedColumns = this.getSelectedColumns.bind(this);
		this.getAllocatedColumns = this.getAllocatedColumns.bind(this);
		this.addColumns = this.addColumns.bind(this);
		this.removeColumns = this.removeColumns.bind(this);
		this.handleChangeMultiColumn = this.handleChangeMultiColumn.bind(this);
	}

	handleChangeMultiColumn(evt) {
		const select = ReactDOM.findDOMNode(this.refs.input);
		const values = [].filter.call(select.options, function(o) {
			return o.selected;
		}).map(function(o) {
			return o.value;
		});
		this.setState({ selectedValues: values });
	}

	handleChange(evt) {
		if (evt.value !== "...") {
			this.setState({ selectedValues: evt.value, controlValue: [evt.value] });
			if (this.props.updateControlValue) {
				this.props.updateControlValue(this.props.control.name, [evt.value]);
			}
		}
	}

	// Selected columns are those that are referenced by values in the control that have
	// been selected by the user.
	getSelectedColumns() {
		// logger.info("getSelectedColumns");
		// logger.info(this.state.selectedValues);
		return this.state.selectedValues;
	}

	// Allocated columns are columns that are referenced by the current control value.
	getAllocatedColumns() {
		// logger.info("getAllocatedColumns");
		return this.getControlValue();
	}

	addColumns(columnNames, callback) {
		// logger.info("addColumns");
		var currentColumns = this.state.controlValue;
		// logger.info(currentColumns);
		if (this.props.multiColumn) {
			currentColumns = _.union(currentColumns, columnNames);
		} else if (columnNames.length === 1) {
			currentColumns = columnNames;
		}
		// logger.info(currentColumns);

		this._update_callback = callback;

		var that = this;
		this.setState({
			controlValue: currentColumns,
			selectedValues: []
		}, function() {
			that.props.updateControlValue(that.props.control.name, currentColumns);
			that.validateInput();
		});
	}

	removeColumns(columnNames, callback) {
		// logger.info("removeColumns");
		var currentColumns = this.state.controlValue;
		// logger.info(currentColumns);
		if (this.props.multiColumn) {
			currentColumns = _.difference(currentColumns, columnNames);
		} else {
			// Always remove the current value
			currentColumns = [];
		}
		// logger.info(currentColumns);

		this._update_callback = callback;

		var that = this;
		this.setState({
			controlValue: currentColumns,
			selectedValues: []
		}, function() {
			that.props.updateControlValue(that.props.control.name, currentColumns);
			that.validateInput();
		});
	}

	getControlValue() {
		// logger.info("getControlValue");
		// logger.info(this.state.controlValue);
		return this.state.controlValue;
	}

	render() {
		// logger.info("AllocationControl.render");
		let options;
		let includeEmpty = false;
		if (this.props.multiColumn) {
			options = EditorControl.genStringSelectOptions(this.state.controlValue, this.state.selectedValues);
		} else {
			includeEmpty = !this.state.controlValue || this.state.controlValue.length === 0;
			const availableFields = this.props.availableFieldsAccessor
				?	this.props.availableFieldsAccessor(this.props.control.name)
				: this.props.dataModel;
			options = EditorControl.genColumnSelectDropdownOptions(availableFields.fields,
				this.state.selectedValues);
		}

		if (this._update_callback !== null) {
			this._update_callback();
			this._update_callback = null;
		}

		var errorMessage = <div className="validation-error-message"></div>;
		if (this.state.validateErrorMessage && this.state.validateErrorMessage.text !== "") {
			errorMessage = (
				<div className="validation-error-message">
					<p className="form__validation" style={{ "display": "block", "margin": "0px" }} >
						<span className="form__validation--invalid">{this.state.validateErrorMessage.text}</span>
					</p>
				</div>
			);
		}

		var controlName = this.getControlID().split("-")[2];
		var stateDisabled = {};
		var stateStyle = {};
		if (typeof this.props.controlStates[controlName] !== "undefined") {
			if (this.props.controlStates[controlName] === "disabled") {
				stateDisabled.disabled = true;
				stateStyle = {
					color: "#D8D8D8",
					borderColor: "#D8D8D8"
				};
			} else if (this.props.controlStates[controlName] === "hidden") {
				stateStyle.visibility = "hidden";
			}
		}

		if (this.props.multiColumn) {
			// help={this.props.control.additionalText}
			return (
				<div className="editor_control_area" style={stateStyle}>
					<FormControl {...stateDisabled}
						id={this.getControlID()}
						className="column-allocator"
						componentClass="select"
						multiple
						rows={4}
						name={this.props.control.name}
						style={stateStyle}
						onChange={this.handleChangeMultiColumn}
						value={this.state.selectedValues}
						ref="input"
					>
						{options}
					</FormControl>
					{errorMessage}
				</div>
			);
		}
		const currentSeln = includeEmpty ? "..." : this.state.controlValue[0];
		// help={this.props.control.additionalText}
		return (
			<div className="editor_control_area" style={stateStyle}>
				<Dropdown {...stateDisabled}
					id={this.getControlID()}
					name={this.props.control.name}
					options={options}
					onChange={this.handleChange}
					onBlur={this.validateInput}
					value={currentSeln}
					placeholder={this.props.control.additionalText}
					ref="input"
				/>
				{errorMessage}
			</div>
		);
	}
}

FieldAllocatorControl.propTypes = {
	dataModel: React.PropTypes.object.isRequired,
	control: React.PropTypes.object.isRequired,
	controlStates: React.PropTypes.object,
	updateControlValue: React.PropTypes.func
};