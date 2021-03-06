/*
 * Copyright 2017-2020 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe("Test for secondary toolbar Cut and Paste buttons", function() {
	before(() => {
		cy.visit("/");
		cy.openCanvasDefinition("commentColorCanvas.json");
	});

	it("Test cutting some nodes and a comment and paste to canvas using toolbar", function() {
		// Validate there are 8 links on the canvas with port style
		cy.verifyNumberOfLinks(8);

		cy.getCommentWithText(" comment 1").click();
		// Select multiple nodes
		cy.ctrlOrCmdClickNode("DRUG1n");
		cy.ctrlOrCmdClickNode("Na_to_K");
		cy.ctrlOrCmdClickNode("Discard Fields");

		// Cut/paste nodes and comment using toolbar
		cy.clickToolbarCut();
		cy.clickToolbarPaste();

		// Verification steps
		cy.verifyNumberOfNodes(6);
		cy.verifyNumberOfComments(3);
		// There are 7 links because a data link has disappeared during the cut and paste
		cy.verifyNumberOfLinks(7);
	});
});

describe("Test for secondary toolbar Copy and Paste buttons", function() {
	before(() => {
		cy.visit("/");
		cy.openCanvasDefinition("commentColorCanvas.json");
	});

	it("Test copying some nodes and a comment and paste to canvas using toolbar", function() {
		// Validate there are 8 links on the canvas with port style
		cy.verifyNumberOfLinks(8);

		cy.getCommentWithText(" comment 2").click();
		// Select multiple nodes
		cy.ctrlOrCmdClickNode("Define Types");
		cy.ctrlOrCmdClickNode("C5.0");
		cy.ctrlOrCmdClickNode("Neural Net");

		// Copy/paste nodes and comment using toolbar
		cy.clickToolbarCopy();
		cy.clickToolbarPaste();

		// Verification steps
		cy.verifyNumberOfNodes(9);
		cy.verifyNumberOfComments(4);
		// There are 12 links because 2 new data link and 2 new comment links were created during the copy and paste
		cy.verifyNumberOfLinks(12);
	});
});

describe("Test for secondary toolbar Create and Delete button", function() {
	before(() => {
		cy.visit("/");
		cy.openCanvasDefinition("commentColorCanvas.json");
	});

	it("Test adding a new comment to selected node, delete node, " +
  "select all comments and delete using toolbar", function() {
		// Select node
		cy.getNodeWithLabel("C5.0").click();

		// Add comment using toolbar
		cy.clickToolbarAddComment();
		cy.editTextInComment("", "New Comment");

		// Double-click node to open its properties
		cy.getNodeWithLabel("Define Types").dblclick();

		// Delete node using toolbar
		cy.clickToolbarOverflow();
		cy.clickToolbarDelete();

		// Verification steps
		cy.verifyNodeIsDeleted("Define Types");
		cy.verifyNumberOfNodes(5);

		// Select all comments
		cy.selectAllCommentsUsingCtrlOrCmdKey();

		// Delete selected comments using toolbar
		cy.clickToolbarDelete();
		cy.verifyNumberOfComments(0);
	});
});

describe("Test for secondary toolbar resize", function() {
	before(() => {
		cy.viewport(1400, 800);
		cy.visit("/");
		cy.openCanvasDefinition("commentColorCanvas.json");
	});

	it.skip("Test number of items in toolbar for different window sizes", function() {
		// TODO: For given viewport size, number of items in toolbar doesn't match with chimp tests
		// Skipping this test - travis shows different numbers for cy.verifyNumberOfItemsInToolbar()
		cy.viewport(500, 600);
		cy.verifyNumberOfItemsInToolbar(8); // 10 items in chimp test

		cy.viewport(540, 600);
		cy.verifyNumberOfItemsInToolbar(9); // 11 items in chimp test

		cy.viewport(580, 600);
		cy.verifyNumberOfItemsInToolbar(9); // 12 items in chimp test

		cy.viewport(620, 600);
		cy.verifyNumberOfItemsInToolbar(13);

		cy.viewport(660, 600);
	});
});

describe("Test for secondary toolbar add comment", function() {
	before(() => {
		cy.viewport(1330, 660);
		cy.visit("/");
	});

	it("Add comments using toolbar in regular canvas and extra canvas, verify comment transform, " +
  "zoom-in and zoom-out using toolbar in regular canvas and extra canvas", function() {
		// Add first comment using toolbar
		cy.clickToolbarAddComment();
		cy.editTextInComment("", "Comment 1");
		cy.verifyCommentTransform("Comment 1", "translate(30, 30)");

		// Zoom-in using toolbar
		cy.clickToolbarZoomIn();
		cy.clickToolbarZoomIn();
		cy.verifyZoomTransform("translate(486.825,222.29) scale(1.2100000000000002)");

		// Add second comment using toolbar
		cy.clickToolbarAddComment();
		cy.editTextInComment("", "Comment 2");
		cy.verifyCommentTransform("Comment 2", "translate(-372.33471074380157, -153.71074380165285)");

		// Zoom-out using toolbar
		cy.clickToolbarZoomOut();
		cy.clickToolbarZoomOut();
		cy.clickToolbarZoomOut();
		cy.clickToolbarZoomOut();
		cy.verifyZoomTransform("translate(698.1465746875213,317.7647701659722) scale(0.8264462809917354)");

		// Add third comment using toolbar
		cy.clickToolbarAddComment();
		cy.editTextInComment("", "Comment 3");
		cy.verifyCommentTransform("Comment 3", "translate(-814.7573553719008, -354.4953719008264)");

		// Add fourth comment using toolbar
		cy.clickToolbarAddComment();
		cy.editTextInComment("", "Comment 4");
		cy.verifyCommentTransform("Comment 4", "translate(-804.7573553719008, -344.4953719008264)");

		// Set canvas config to display extra canvas
		cy.setCanvasConfig({ "selectedExtraCanvasDisplayed": true });
		cy.inExtraCanvas();

		// Add first comment in extra canvas using toolbar
		cy.clickToolbarAddCommentnInExtraCanvas();
		cy.editTextInComment("", "Comment 5");
		cy.verifyCommentTransform("Comment 5", "translate(30, 30)");

		// Zoom-in extra canvas using toolbar
		cy.clickToolbarZoomInExtraCanvas();
		cy.clickToolbarZoomInExtraCanvas();
		cy.verifyZoomTransformInExtraCanvas("translate(486.825,70.28999999999999) scale(1.2100000000000002)");

		// Add second comment in extra canvas using toolbar
		cy.clickToolbarAddCommentnInExtraCanvas();
		cy.editTextInComment("", "Comment 6");
		cy.verifyCommentTransform("Comment 6", "translate(-372.33471074380157, -28.090909090909072)");

		// Zoom-out in extra canvas using toolbar
		cy.clickToolbarZoomOutExtraCanvas();
		cy.clickToolbarZoomOutExtraCanvas();
		cy.clickToolbarZoomOutExtraCanvas();
		cy.clickToolbarZoomOutExtraCanvas();
		cy.verifyZoomTransformInExtraCanvas(
			"translate(698.1465746875213,113.85574755822688) scale(0.8264462809917354)"
		);

		// Add third comment in extra canvas using toolbar
		cy.clickToolbarAddCommentnInExtraCanvas();
		cy.editTextInComment("", "Comment 7");
		cy.verifyCommentTransform("Comment 7", "translate(-814.7573553719008, -107.76545454545453)");

		// Add fourth comment in extra canvas using toolbar
		cy.clickToolbarAddCommentnInExtraCanvas();
		cy.editTextInComment("", "Comment 8");
		cy.verifyCommentTransform("Comment 8", "translate(-804.7573553719008, -97.76545454545453)");

		// Add 5th comment to first canvas
		cy.inRegularCanvas();
		cy.clickToolbarZoomToFit();
		cy.clickToolbarAddComment();
		cy.editTextInComment("", "Comment 5a");
		cy.verifyCommentTransform("Comment 5a", "translate(-1357.7483327072375, -338.4953719008264)");
	});
});
