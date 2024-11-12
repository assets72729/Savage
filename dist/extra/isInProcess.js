var Memory = /** @class */ (function () {
    function Memory() {
        this.objects = [];
    }
    Memory.prototype.startProcess = function (id) {
        var existingObject = this.objects.find(function (obj) { return obj.id === id; });
        if (existingObject) {
            return false;
        }
        else {
            this.objects.push({ id: id, isInProcess: true });
            return true;
        }
    };
    Memory.prototype.removeObject = function (id) {
        this.objects = this.objects.filter(function (obj) { return obj.id !== id; });
    };
    Memory.prototype.completeProcess = function (id) {
        var obj = this.objects.find(function (obj) { return obj.id === id; });
        if (obj) {
            obj.isInProcess = false;
            this.removeObject(id);
        }
    };
    Memory.prototype.isObjectInProcess = function (id) {
        var obj = this.objects.find(function (obj) { return obj.id === id; });
        return obj ? obj.isInProcess : false;
    };
    Memory.prototype.getObjects = function () {
        return this.objects;
    };
    return Memory;
}());
var memory = new Memory();
export default memory;
