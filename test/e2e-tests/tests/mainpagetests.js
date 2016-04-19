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
            expect(page.getTipItemsCount()).toBe(3);

            var expectedItems = ['apple', 'green apple', 'red apple'];
            page.getTipItems().each(function(tipItem, index) {
                expect(tipItem.getText()).toBe(expectedItems[index]);
            });

        });

        it('maximum 5 tips can appear in dropdown', function() {

            page.typeTextInInput('r');
            expect(page.getTipItemsCount()).toBe(5);

            var expectedItems = ['cherry', 'orange', 'cucumber', 'green apple', 'red apple'];

            page.getTipItems().each(function(tipItem, index) {
                expect(tipItem.getText()).toBe(expectedItems[index]);
            });
        });

        it('check navigation via tips using keyboard. ArrowDown', function() {
            page.typeTextInInput('r');
            var expectedActiveItems = ['cherry', 'orange', 'cucumber', 'green apple', 'red apple'];

            for(var i = 0; i < 5; i++){
                page.clickArrowDown();

                var actualActiveItems = page.getTipItems().filter(function(tip, index){
                  return page.tipContainsClass(index, 'active');
                });

                expect(actualActiveItems.count()).toBe(1);
                expect(actualActiveItems.get(0).getText()).toBe(expectedActiveItems[i]);
            }
        });

        it('check navigation via tips using keyboard. ArrowUp', function() {
            page.typeTextInInput('r');
            var expectedActiveItems = ['cherry', 'orange', 'cucumber', 'green apple', 'red apple'];
            var itemsCount = expectedActiveItems.length;

            for(var i = 0; i < itemsCount ; i++){
                page.clickArrowUp();

                var actualActiveItems = page.getTipItems().filter(function(tip, index){
                  return page.tipContainsClass(index, 'active');
                });

                expect(actualActiveItems.count()).toBe(1);
                expect(actualActiveItems.get(0).getText()).toBe(expectedActiveItems[itemsCount - 1 - i]);
              }
        });

        it('select tip on mouseclick', function() {
            page.typeTextInInput('r');
            page.mouseClickOnElement(page.getTipItem(0));
            setTimeout(function() {
                expect(page.getInputText()).toBe("cherry");
            }, 3000);
        });

        it('select several tips on mouseclick', function() {
            var textsToType = ['r', 'p', 'a'];
            var expectedInputTexts = ['cherry,', 'cherry, potato,', 'cherry, potato, apple'];
            textsToType.forEach(function(textToType, index) {
                page.typeTextInInput(textToType);
                setTimeout(function() {
                    expect(page.getInputText()).toBe(expectedInputTexts[index]);
                }, 3000);
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
            page.typeTextInInput('potato, potato');
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