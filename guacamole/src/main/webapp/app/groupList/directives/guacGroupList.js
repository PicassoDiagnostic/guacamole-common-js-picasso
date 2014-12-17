/*
 * Copyright (C) 2014 Glyptodon LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A directive which displays the contents of a connection group.
 */
angular.module('groupList').directive('guacGroupList', [function guacGroupList() {

    return {
        restrict: 'E',
        replace: true,
        scope: {

            /**
             * The connection group to display.
             *
             * @type ConnectionGroup|Object 
             */
            connectionGroup : '='

        },

        templateUrl: 'app/groupList/templates/guacGroupList.html',
        controller: ['$scope', '$injector', '$interval', function guacGroupListController($scope, $injector, $interval) {

            // Get required types
            var GroupListItem = $injector.get('GroupListItem');

            // Set contents whenever the connection group is assigned or changed
            $scope.$watch("connectionGroup", function setContents(connectionGroup) {

                if (connectionGroup)
                    $scope.rootItem = GroupListItem.fromConnectionGroup(connectionGroup);
                else
                    $scope.rootItem = null;

            });

            /**
             * Toggle the open/closed status of a group list item.
             * 
             * @param {GroupListItem} groupListItem
             *     The list item to expand, which should represent a
             *     connection group.
             */
            $scope.toggleExpanded = function toggleExpanded(groupListItem) {
                groupListItem.expanded = !groupListItem.expanded;
            };
            
        }]

    };
}]);
