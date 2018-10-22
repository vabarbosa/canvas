Feature: Toolbar

	** Make sure the test harness is running and listening to http://localhost:3001 ***

	As a human
	I want to test secondaryToolbar operations
	So I can build a canvas and perform secondaryToolbar operations

	Scenario: Sanity test for secondary toolbar Cut and Paste buttons
		Then I resize the window size to 1400 width and 800 height
		Given I am on the test harness
		Given I have toggled the app side panel
		Given I have selected the "Flyout" palette layout
		Given I have uploaded palette "/test_resources/palettes/modelerPalette.json"
		Given I have uploaded diagram "/test_resources/diagrams/commentColorCanvas.json"
		Given I have toggled the app side panel

		# Test cutting some nodes and a comment and paste to canvas
		Then I validate there are 8 links on the canvas with port style
		Then I click the comment with text " comment 1" to select it
		Then I Ctrl/Cmnd+click the "DRUG1n" node to add it to the selections
		Then I Ctrl/Cmnd+click the "Na_to_K" node to add it to the selections
		Then I Ctrl/Cmnd+click the "Discard Fields" node to add it to the selections
		Then I click on the secondary toolbar cut button
		Then I click on the secondary toolbar paste button
		Then I verify the number of nodes are 6
		Then I verify the number of comments are 3
		 # There are 7 links because a data link has disappeared during the cut and paste
		Then I validate there are 7 links on the canvas with port style

	Scenario: Sanity test for secondary toolbar Copy and Paste buttons
		Then I resize the window size to 1400 width and 800 height
		Given I am on the test harness
		Given I have toggled the app side panel
		Given I have selected the "Flyout" palette layout
		Given I have uploaded palette "/test_resources/palettes/modelerPalette.json"
		Given I have uploaded diagram "/test_resources/diagrams/commentColorCanvas.json"
		Given I have toggled the app side panel

		# Test copying some nodes and a comment and paste to canvas
		Then I validate there are 8 links on the canvas with port style
		Then I click the comment with text " comment 2" to select it
		Then I Ctrl/Cmnd+click the "Define Types" node to add it to the selections
		Then I Ctrl/Cmnd+click the "C5.0" node to add it to the selections
		Then I Ctrl/Cmnd+click the "Neural Net" node to add it to the selections
		Then I click on the secondary toolbar copy button
		Then I click on the secondary toolbar paste button
		Then I verify the number of nodes are 9
		Then I verify the number of comments are 4
		 # There are 12 links because 2 new data link and 2 new comment links were created during the copy and paste
		Then I validate there are 12 links on the canvas with port style

	Scenario: Sanity test for secondary toolbar Create and Delete button
		Then I resize the window size to 1400 width and 800 height
		Given I am on the test harness
		Given I have toggled the app side panel
		Given I have selected the "Flyout" palette layout
		Given I have uploaded palette "/test_resources/palettes/modelerPalette.json"
		Given I have uploaded diagram "/test_resources/diagrams/commentColorCanvas.json"
		Given I have toggled the app side panel

		Then I resize the window size to 1330 width and 660 height
		Then I select node 3 the "C5.0" node
		Then I click on the secondary toolbar create comment button
		Then I edit comment 1 with the comment text "New Comment"
		Then I double click the "Define Types" node to open its properties
		Then I click on the secondary toolbar overflow button
		Then I click on the secondary toolbar delete button
		Then I verify the number of nodes are 5
		Then I select all the comments in the canvas
		Then I click on the secondary toolbar delete button
		Then I verify the number of comments are 0

	Scenario: Sanity test for secondary toolbar resize
		Then I resize the window size to 1400 width and 800 height
		Given I am on the test harness
		Given I have toggled the app side panel
		Given I have selected the "Flyout" palette layout
		Given I have uploaded palette "/test_resources/palettes/modelerPalette.json"
		Given I have uploaded diagram "/test_resources/diagrams/commentColorCanvas.json"
		Given I have toggled the app side panel

		Then I pause for 1 seconds
		Then I resize the window size to 500 width and 500 height
		Then I verify the number of items in the secondary toolbar are 6
		Then I resize the window size to 600 width and 600 height
		Then I verify the number of items in the secondary toolbar are 8
		Then I resize the window size to 700 width and 600 height
		Then I verify the number of items in the secondary toolbar are 9
		Then I resize the window size to 800 width and 600 height
		Then I verify the number of items in the secondary toolbar are 11
		Then I resize the window size to 1330 width and 660 height

	Scenario: Sanity test for secondary toolbar horizontal and vertical layout
		Then I resize the window size to 1400 width and 800 height
		Given I am on the test harness
		Given I have toggled the app side panel
		Given I have selected the "Flyout" palette layout
		Given I have uploaded palette "/test_resources/palettes/modelerPalette.json"
		Given I have uploaded diagram "/test_resources/diagrams/commentColorCanvas.json"
		Given I have toggled the app side panel
		Then I click on the secondary toolbar horizontal layout button
		Then I verify the node 1 position is "translate(500, 127.5)"
		Then I verify the node 2 position is "translate(200, 127.5)"
		Then I verify the node 3 position is "translate(650, 50)"
		Then I verify the node 4 position is "translate(650, 205)"
		Then I verify the node 5 position is "translate(50, 127.5)"
		Then I verify the node 6 position is "translate(350, 127.5)"
		Then I click on the secondary toolbar vertical layout button
		Then I verify the node 1 position is "translate(125, 515)"
		Then I verify the node 2 position is "translate(125, 205)"
		Then I verify the node 3 position is "translate(50, 670)"
		Then I verify the node 4 position is "translate(200, 670)"
		Then I verify the node 5 position is "translate(125, 50)"
		Then I verify the node 6 position is "translate(125, 360)"

		Given I have toggled the app side panel
		Given I have selected the "vertical" fixed Layout
		Given I have toggled the app side panel
		Then I click on the secondary toolbar horizontal layout button
		Then I verify the node 1 position is "translate(125, 515)"
		Then I verify the node 2 position is "translate(125, 205)"
		Then I verify the node 3 position is "translate(50, 670)"
		Then I verify the node 4 position is "translate(200, 670)"
		Then I verify the node 5 position is "translate(125, 50)"
		Then I verify the node 6 position is "translate(125, 360)"

		Given I have toggled the app side panel
		Given I have selected the "none" fixed Layout
		Given I have toggled the app side panel
		Then I click on the secondary toolbar horizontal layout button
		Then I verify the node 1 position is "translate(500, 127.5)"
		Then I verify the node 2 position is "translate(200, 127.5)"
		Then I verify the node 3 position is "translate(650, 50)"
		Then I verify the node 4 position is "translate(650, 205)"
		Then I verify the node 5 position is "translate(50, 127.5)"
		Then I verify the node 6 position is "translate(350, 127.5)"

		Given I have toggled the app side panel
		Given I have selected the "horizontal" fixed Layout
		Given I have toggled the app side panel
		Then I click on the secondary toolbar vertical layout button
		Then I verify the node 1 position is "translate(500, 127.5)"
		Then I verify the node 2 position is "translate(200, 127.5)"
		Then I verify the node 3 position is "translate(650, 50)"
		Then I verify the node 4 position is "translate(650, 205)"
		Then I verify the node 5 position is "translate(50, 127.5)"
		Then I verify the node 6 position is "translate(350, 127.5)"

	Scenario: Sanity test for secondary toolbar add comment
		Then I resize the window size to 1400 width and 800 height
		Given I am on the test harness
		Given I have toggled the app side panel
		Given I have selected the "Flyout" palette layout
		Given I have toggled the app side panel
		Then I resize the window size to 1330 width and 660 height

		Then I click on the secondary toolbar create comment button
		Then I verify the comment 1 position is "translate(30, 30)"
		Then I click zoom in
		Then I click zoom in
		Then I verify zoom transform value is "translate(490.825,219.79) scale(1.2100000000000002)"
		Then I click on the secondary toolbar create comment button
		Then I verify the comment 2 position is "translate(-375.64049586776855, -151.64462809917353)"
		Then I click zoom out
		Then I click zoom out
		Then I click zoom out
		Then I click zoom out
		Then I verify zoom transform value is "translate(703.5126015982514,314.41100334676594) scale(0.8264462809917354)"
		Then I click on the secondary toolbar create comment button
		Then I verify the comment 3 position is "translate(-821.2502479338843, -350.4373140495868)"
		Then I click on the secondary toolbar create comment button
		Then I verify the comment 4 position is "translate(-811.2502479338843, -340.4373140495868)"

		Given I have toggled the app side panel
		Then I click on extra canvas toggle
		Given I have toggled the app side panel

		Then I click on the extra canvas secondary toolbar create comment button
		Then I verify the comment 5 position is "translate(30, 30)"
		Then I click extra canvas zoom in
		Then I click extra canvas zoom in
		Then I verify extra canvas zoom transform value is "translate(490.825,67.78999999999999) scale(1.2100000000000002)"
		Then I click on the extra canvas secondary toolbar create comment button
		Then I verify the comment 6 position is "translate(-375.64049586776855, -26.024793388429735)"
		Then I click extra canvas zoom out
		Then I click extra canvas zoom out
		Then I click extra canvas zoom out
		Then I click extra canvas zoom out
		Then I verify extra canvas zoom transform value is "translate(703.5126015982514,110.50198073902054) scale(0.8264462809917354)"
		Then I click on the extra canvas secondary toolbar create comment button
		Then I verify the comment 7 position is "translate(-821.2502479338843, -103.70739669421488)"
		Then I click on the extra canvas secondary toolbar create comment button
		Then I verify the comment 8 position is "translate(-811.2502479338843, -93.70739669421488)"

		# Add 5th comment to first canvas
		Then I click zoom to fit
		Then I click on the secondary toolbar create comment button
		Then I verify the comment 5 position is "translate(-1379.000876064967, -334.4373140495868)"
