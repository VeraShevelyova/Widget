'use strict';

describe('my app', function() {
    var mainPage = require('../pages/main.js');
    var page = new mainPage();

    it('should automatically redirect to /foods when location hash/fragment is empty', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/foods");
    });

    describe('main page', function() {

        beforeEach(function() {
            browser.get('index.html#/foods');
        });


        it('should filter tips in dropdown based on text typed in input', function() {
            page.typeTextInInput('ap');
            var expectedTipItems = ['apple', 'green apple', 'red apple'];

            page.checkTipItemsCount(3)
            page.checkTipItems(expectedTipItems);

        });

        it('maximum 5 tips can appear in dropdown', function() {

            page.typeTextInInput('r');
            var expectedTipItems = ['cherry', 'orange', 'cucumber', 'green apple', 'red apple'];

            page.checkTipItemsCount(5)
            page.checkTipItems(expectedTipItems);
        });

        it('if tip does not exist dropdown is empty', function() {

            page.typeTextInInput('popopo');

            page.checkTipItemsCount(0);
            expect(page.getInputText()).toBe("");
        });

        it('check navigation via tips using keyboard. ArrowDown', function() {
            page.typeTextInInput('r');
            var expectedActiveTips = ['cherry', 'orange', 'cucumber', 'green apple', 'red apple'];

            for(var i = 0; i < expectedActiveTips.length; i++){
                page.clickArrowDown();

                var actualActiveTips = page.getActiveTips();

                expect(actualActiveTips.count()).toBe(1);
                expect(actualActiveTips.get(0).getText()).toBe(expectedActiveTips[i]);
            }
        });

        it('check navigation via tips using keyboard. ArrowUp', function() {
            page.typeTextInInput('r');
            var expectedActiveTips = ['cherry', 'orange', 'cucumber', 'green apple', 'red apple'];
            var itemsCount = expectedActiveTips.length;

            for(var i = 0; i < itemsCount ; i++){
                page.clickArrowUp();

                var actualActiveTips = page.getActiveTips();

                expect(actualActiveTips.count()).toBe(1);
                expect(actualActiveTips.get(0).getText()).toBe(expectedActiveTips[itemsCount - 1 - i]);
              }
        });

        it('select tip on mouseclick', function() {
            page.typeTextInInput('r');
            page.mouseClickOnElement(page.getTipItem(0));
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.textToBePresentInElementValue(page.inputSelector, ' cherry, '), 1000);
        });

        it('select several tips on mouseclick', function() {
            var textsToType = ['r', 'po', 'a'];
            var expectedInputTexts = [' cherry, ', 'cherry, potato, ', 'cherry, potato, apple, '];
            var EC = protractor.ExpectedConditions;
            textsToType.forEach(function(textToType, index) {
                page.typeTextInInput(textToType);
                page.mouseClickOnElement(page.getTipItem(0));
                browser.wait(EC.textToBePresentInElementValue(page.inputSelector, 
                expectedInputTexts[index]), 1000);
            });
        });

        it('check alert message for "normal racion"', function() {
            page.typeTextInInput('cherry, red apple');
            page.submit();
            var alert = browser.switchTo().alert();
            expect(alert.getText()).
            toBe('Your racion is normal for today, you will not get fat. It is 7');
            alert.then(function(alert) {
                alert.accept();
            });
            var currentUrl = browser.getLocationAbsUrl();
            expect(currentUrl).toContain('/foods/normal');
        });

        it('check alert message for "overweight racion"', function() {
            page.typeTextInInput('potato, potato,');
            page.submit();
            var alert = browser.switchTo().alert();
            expect(alert.getText()).
            toBe('You eat too much today, you will get fat. It is 30');
            alert.then(function(alert) {
                alert.accept();
            });
            var currentUrl = browser.getLocationAbsUrl();
            expect(currentUrl).toContain('/foods/overweight');
        });

    });
});