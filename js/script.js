// Simple Enigma M3 Machine
// IT3120 - Nguyen Van Thanh - 20122401 - CNTT 2.03

// Constanst
var Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var Rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO'; // Out -> In <=> Alphabet -> Rotor1, notch : V->W
var Rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE'; // Out -> In <=> Alphabet -> Rotor2, notch : E->F
var Rotor3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ'; // Out -> In <=> Alphabet -> Rotor3, notch : Q->R

var ReflectorB = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';


// Main
var myApp = angular.module('myApp', []);
myApp.controller('myCtrl', function($scope) {
    // Initilize variable
    $scope.isDisabled = false; // Disable all input button, input field after press Save Configuration
    $scope.input = "";
    $scope.output = "";
    $scope.Start1 = 'A';
    $scope.Start2 = 'A';
    $scope.Start3 = 'A';
    $scope.Plugboard = [];
    $scope.Plugboard[0] = '';
    $scope.Plugboard[1] = '';
    $scope.Plugboard[2] = '';
    $scope.Plugboard[3] = '';
    $scope.Plugboard[4] = '';
    $scope.Plugboard[5] = '';
    $scope.status = 'Please enter config and save it!'

    // Utility function
    $scope.Up = function(c) {
        var temp = c.charCodeAt();
        temp++;
        if (temp > 90) temp = 65;
        return String.fromCharCode(temp);
    }
    $scope.Down = function(c) {
        var temp = c.charCodeAt();
        temp--;
        if (temp < 65) temp = 90;
        return String.fromCharCode(temp);
    }
    $scope.AutoCap = function(s) {
        return s.toUpperCase();
    }

    // Show, hide info
    $scope.showInfo = true;
    $scope.showinfo = "Hide Inside"
    $scope.toggle = function() {
        console.log("Toogle");
        $scope.showInfo = !$scope.showInfo;
        if ($scope.showInfo == true) {
            $scope.showinfo = "Hide Inside";
        } else {
            $scope.showinfo = "Show Inside";
        }
    }

    // Khi người dùng thay đổi config của Rotor hoăc Plugboard hàm này tự động được gọi, lưu lại StartConfig mới.
    $scope.disableConfig = function() {
        var flag = true;
        for (var i = 0; i <= 5; i++)
            if ($scope.Plugboard[i] !== '') {
                if ($scope.Plugboard[i].length != 2) {
                    alert("Wrong config at " + (i + 1));
                    flag = false;
                    break;
                }
                for (var j = i + 1; j <= 5; j++)
                    if ($scope.Plugboard[j] !== '') {
                        var a = $scope.Plugboard[i][0];
                        var b = $scope.Plugboard[i][1];
                        var c = $scope.Plugboard[j][0];
                        var d = $scope.Plugboard[j][1];
                        if ((a === c) || (b === d) || (a == d) || (b == c)) {
                            alert("Wrong Config! " + (i + 1) + " " + (j + 1));
                            flag = false;
                            break;
                        }
                    }
                if (!flag) break;
            }
        if (flag) {
            $scope.isDisabled = !$scope.isDisabled;
            if ($scope.isDisabled) {
                // Save config
                $scope.input = '';
                $scope.output = '';
                $scope.status = 'Config saved ! Now enter input text ...';
                $scope.saveUserConfig();

                $scope.PlugboardIn = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $scope.ReflectorIn = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $scope.PlugboardOut = '';
                $scope.ReflectorOut = '';
                for (var i = 0; i <= 25; i++) {
                    $scope.PlugboardOut += $scope.DePlug[$scope.PlugboardIn[i]];
                    $scope.ReflectorOut += $scope.DeReflector[$scope.ReflectorIn[i]];
                }
                $scope.EnglishAlphabet = Alphabet;
                $scope.Rotor1Mapping = Rotor1;
                $scope.Rotor2Mapping = Rotor2;
                $scope.Rotor3Mapping = Rotor3;

            } else {
                // Reset input and wait for user reconfig the machine
                $scope.input = '';
                $scope.output = '';
                $scope.status = 'Waiting for user reconfig ...';
            }
        }
    }

    $scope.saveUserConfig = function() {
        $scope.Start = [];
        $scope.Start[1] = $scope.Start1;
        $scope.Start[2] = $scope.Start2;
        $scope.Start[3] = $scope.Start3;

        $scope.Plug = [];
        $scope.DePlug = [];

        for (var i = 0; i <= 25; i++) {
            $scope.Plug[Alphabet[i]] = Alphabet[i];
            $scope.DePlug[Alphabet[i]] = Alphabet[i];
        }
        for (var i = 0; i <= 5; i++) {
            $scope.Plug[$scope.Plugboard[i][0]] = $scope.Plugboard[i][1];
            $scope.Plug[$scope.Plugboard[i][1]] = $scope.Plugboard[i][0];
            $scope.DePlug[$scope.Plugboard[i][1]] = $scope.Plugboard[i][0];
            $scope.DePlug[$scope.Plugboard[i][0]] = $scope.Plugboard[i][1];
        }

        $scope.Reflector = [];
        $scope.DeReflector = [];

        $scope.Rotor = [];
        $scope.DeRotor = [];
        $scope.Slot = [];
        $scope.DeSlot = [];

        for (var i = 1; i <= 3; i++) {
            $scope.Rotor[i] = [];
            $scope.DeRotor[i] = [];
            $scope.Slot[i] = [];
            $scope.DeSlot[i] = [];
        }
        for (var i = 0; i <= 25; i++) {
            $scope.Reflector[Alphabet[i]] = ReflectorB[i];
            $scope.DeReflector[ReflectorB[i]] = Alphabet[i];


            $scope.Rotor[1][Alphabet[i]] = Rotor1[i];
            $scope.DeRotor[1][Rotor1[i]] = Alphabet[i];

            $scope.Rotor[2][Alphabet[i]] = Rotor2[i];
            $scope.DeRotor[2][Rotor2[i]] = Alphabet[i];

            $scope.Rotor[3][Alphabet[i]] = Rotor3[i];
            $scope.DeRotor[3][Rotor3[i]] = Alphabet[i];

            for (var ind = 1; ind <= 3; ind++) {
                var temp = $scope.Start[ind].charCodeAt() + i;
                if (temp > 90) temp -= 26;
                $scope.Slot[ind][i] = String.fromCharCode(temp);
                $scope.DeSlot[ind][String.fromCharCode(temp)] = i;
            }
        }
    }

    $scope.updateSlot = function(ind) {
        var start;
        if (ind === 1) start = $scope.Start[1];
        else if (ind === 2) start = $scope.Start[2];
        else start = $scope.Start[3];
        for (var j = 0; j <= 25; j++) {
            var temp = start.charCodeAt() + j;
            if (temp > 90) temp -= 26;
            $scope.Slot[ind][j] = String.fromCharCode(temp);
            $scope.DeSlot[ind][String.fromCharCode(temp)] = j;
        }
    }

    // Mỗi lần input thay đổi thì hàm này sẽ được gọi, AutoCap lại input  và encode lại từ đầu
    $scope.Encrypt = function() {
        console.log('Encrypt() called');
        // autoCapilize all input and clear Space char
        $scope.input = $scope.input.toUpperCase();

        // Encrypt the message
        if (!$scope.isDisabled) {
            $scope.output = "Please config the machine and press 'Save Configuration'!";
        } else {
            // Trước mỗi bước Encrypt, cần reset Rotor quay lại trạng thái người dùng config trước đó để tạo hiệu ứng roll-back
            $scope.saveUserConfig();
            var output = "";
            $scope.steps = [];
            for (var i = 0; i < $scope.input.length; i++) {
                // Input
                var a;
                var c = $scope.input[i];
                $scope.steps[0]=c;

                // Qua Plugboard
                c = $scope.Plug[c];
                $scope.steps[1]=c;
                
                // Plug -> Out R1
                $scope.Start[1] = $scope.Up($scope.Start[1]);
                $scope.status = 'Rotor 1 rotated!';
                $scope.updateSlot(1);
                // TODO Deal with Rotor2,3 xoay --> Done

                if ($scope.Start[2] == 'E') {
                    // Double Stepping
                    console.log('Rotor2 rotated due to double stepping!');
                    $scope.Start[2] = $scope.Up($scope.Start[2]);
                    $scope.updateSlot(2);

                    console.log('Rotor3 rotated due to double stepping');
                    $scope.status = 'Rotor 2 rorated due to double stepping! && Rotor 3 rotated due to Rotor 2\'s notch reached';
                    $scope.Start[3] = $scope.Up($scope.Start[3]);
                    $scope.updateSlot(3);
                }

                if ($scope.Start[1] === 'W') {
                    // Rotor1 notch
                    // -> Roter 2 xoay
                    console.log('Rotor2 rotated!');
                    $scope.status = 'Rotor 2 rotated due to Rotor 1\'s notch reached';
                    $scope.Start[2] = $scope.Up($scope.Start[2]);
                    $scope.updateSlot(2);
                    if ($scope.Start[2] === 'F') {
                        // Rotor2 notch
                        // -> Rotor 3 xoay
                        console.log('Rotor3 rotated');
                        $scope.status = 'Rotor 3 rotated due to Rotor 2\'s notch reached';
                        $scope.Start[3] = $scope.Up($scope.Start[3]);
                        $scope.updateSlot(3);
                    }
                }

                a = c.charCodeAt() - 'A'.charCodeAt();
                //console.log(a);
                c = $scope.Slot[1][a];


                // Out R1 -> In R1
                c = $scope.Rotor[1][c];
                $scope.steps[2]=c;

                // In R1 -> Out R2
                a = $scope.DeSlot[1][c];
                //console.log(a);
                c = $scope.Slot[2][a];

                // Out R2 -> In R2
                c = $scope.Rotor[2][c];
                $scope.steps[3]=c;

                // In R2 -> Out R3
                a = $scope.DeSlot[2][c];
                c = $scope.Slot[3][a];

                // Out R3 -> In R3
                c = $scope.Rotor[3][c];
                $scope.steps[4]=c;

                // In R3 -> Out Reflector
                a = $scope.DeSlot[3][c];
                c = String.fromCharCode(a + 65);

                // Out Reflector -> In Reflector
                c = $scope.Reflector[c];
                $scope.steps[5]=c;

                // In Reflector -> In R3
                a = c.charCodeAt() - 'A'.charCodeAt();
                c = $scope.Slot[3][a];
                

                // In R3 -> Out R3
                c = $scope.DeRotor[3][c];
                $scope.steps[6]=c;

                // Out R3 -> In R2
                a = $scope.DeSlot[3][c];
                c = $scope.Slot[2][a];
                

                // In R2 -> Out R2
                c = $scope.DeRotor[2][c];
                $scope.steps[7]=c;

                // Out R2 -> In R1
                a = $scope.DeSlot[2][c];
                c = $scope.Slot[1][a];
                

                // In R1 -> Out R1
                c = $scope.DeRotor[1][c];


                // Out R1 -> Out Plug
                a = $scope.DeSlot[1][c];
                c = String.fromCharCode(a + 65);
                $scope.steps[8]=c;
                
                // Out Plug -> In Plug
                //console.log("Here " +c + " " + $scope.DePlug[c] + " " + $scope.DePlug['G'] + $scope.Plug['G']);
                c = $scope.DePlug[c];
                $scope.steps[9]=c;
                output += c;

                // Show Encryption step of last character
                if (i === $scope.input.length - 1) {
                    //$scope.steps = 'Step of encryption ...';
                }
            }
            $scope.output = output;
        }
    };
});