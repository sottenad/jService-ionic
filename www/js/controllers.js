angular.module('starter.controllers', ['ionic', 'angularMoment', 'ionic.utils' ])

.controller('QuestionsCrtl', function($scope, $questions, $localstorage){
    $scope.continueCategory = false;
    $scope.totalDollars = 0;
    $scope.currentQuestion = null;
    $scope.answerBtn = true;
    $scope.random = function(){
        $scope.isCategory = false;
        $scope.currentAnswer = null;
        $scope.answerBtn = true;
        $scope.questions = $questions.getQuestion();
        $scope.questions.then(function(resp){
           $scope.questions = resp.data; 
           $scope.currentQuestion = resp.data[0];
           $scope.questions.shift();
        }, function(status){
            console.log(status);
        });
    }
    $scope.loadCategory = function(catId){
        $scope.isCategory = true;
        $scope.questions = $questions.getAllQuestionsFromCategory(catId);
        $scope.questions.then(function(resp){
            $scope.questions = resp.data.filter(function(obj) {
                return obj.id != $scope.currentQuestion.id;
            });
            $scope.currentQuestion = resp.data[0];
        }, function(status){
            console.log(status);   
        });   
    }
    
    $scope.newQuestionFromCategory = function(){
        $scope.answerBtn = true;
        $scope.currentAnswer = null;
        if($scope.questions.length > 1){
            $scope.questions.shift();
            $scope.currentQuestion = $scope.questions[0]; 
        }else if($scope.questions.length == 1){
           $scope.random(); 
        }else{
            var catId = $scope.currentQuestion.category.id;
            $scope.loadCategory(catId);
        }
    }
    
    $scope.nextAnswer = function(correct){
        if(correct) $scope.totalDollars +=  $scope.currentQuestion.value;
        
        if($scope.continueCategory){
            $scope.newQuestionFromCategory();
        }else{
            $scope.random();
        }
    }

    $scope.showAnswer = function(){
        $scope.answerBtn = false;
        $scope.currentAnswer = $scope.currentQuestion.answer
    }
    $scope.correctAnswer = function(){
        
        $scope.random();
    }
    
    $scope.random();
})
