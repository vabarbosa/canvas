/****************************************************************
** IBM Confidential
**
** OCO Source Materials
**
** SPSS Modeler
**
** (c) Copyright IBM Corp. 2016
**
** The source code for this program is not published or otherwise
** divested of its trade secrets, irrespective of what has been
** deposited with the U.S. Copyright Office.
*****************************************************************/

import React from "react";
import EditorControl from "./editor-control.jsx";

export default class ToggletextControl extends EditorControl {
	constructor(props) {
		super(props);
		if (!props.tableControl) {
			this.state = { controlValue: props.valueAccessor(props.control.name)[0] };
		}
		this.valuesMap = {};
		this.iconsMap = {};
		for (let i = 0; i < this.props.values.length; ++i) {
			this.valuesMap[this.props.values[i]] = this.props.valueLabels[i];
			if (typeof this.props.valueIcons !== "undefined") {
				this.iconsMap[this.props.values[i]] = this.props.valueIcons[i];
			}
		}
	}

	onClick(evt) {
		evt.stopPropagation();  // prevents row selection change when clicking on toggletext
		const renderValue = (this.props.tableControl) ? this.props.value : this.state.controlValue;
		const newValue = (renderValue === this.props.values[0]) ? this.props.values[1] : this.props.values[0];
		if (this.props.tableControl) {
			var newControlValue = this.props.controlValue;
			newControlValue[this.props.rowIndex][this.props.columnIndex] = newValue;
			this.props.setCurrentControlValueSelected(this.props.control.name, newControlValue, this.props.updateControlValue, this.props.getSelectedRows());
		} else {
			this.notifyValueChanged(this.props.control.name, newValue);
			this.setState({ controlValue: newValue });
			this.props.updateControlValue(this.props.control.name, newValue);
		}
	}

	render() {
		const renderValue = (this.props.tableControl) ? this.props.value : this.state.controlValue;
		let rendered = (this.props.tableControl) ? this.valuesMap[renderValue] : this.valuesMap[renderValue];
		if (typeof rendered === "undefined") {
			rendered = renderValue;
		}

		let icon = "";
		if (typeof this.iconsMap[renderValue] !== "undefined") {
			icon = <img className="toggletext_icon" src={this.iconsMap[renderValue]} onClick={this.onClick.bind(this)} />;

		}

		return (
			<div className="toggletext_control">
				{icon}
				<u onClick={this.onClick.bind(this)} className="toggletext_text">
					{rendered}
				</u>
			</div>
		);
	}
}

ToggletextControl.propTypes = {
	rowIndex: React.PropTypes.number, 										// required when tableControl yes
	columnIndex: React.PropTypes.number, 									// required when tableControl yes
	control: React.PropTypes.object.isRequired,
	controlValue: React.PropTypes.array.isRequired,
	values: React.PropTypes.array.isRequired,
	valueLabels: React.PropTypes.array.isRequired,
	valueIcons: React.PropTypes.array,
	value: React.PropTypes.string, 												// required when tableControl yes
	updateControlValue: React.PropTypes.func.isRequired,
	setCurrentControlValueSelected: React.PropTypes.func,	// required when tableControl yes
	getSelectedRows: React.PropTypes.func, 								// required when tableControl yes
	valueAccessor: React.PropTypes.func, 									// required when tableControl no
	tableControl: React.PropTypes.bool
};