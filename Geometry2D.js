class Geometry2D {
    static rotate(point, angle) {
        return new Point2D(point.X * Math.cos(angle) + point.Y * Math.sin(angle),
            point.Y * Math.cos(angle) + point.X * Math.sin(angle)
        ); 
    }    

    static distanse(start, end) {
        if (!end) 
            end = new Point2D();
        return Math.sqrt(Math.pow(end.X - start.X, 2) + Math.pow(end.Y - start.Y, 2));
    }

    static normalize(point) {
        var lenght = this.distanse(point);
        return new Point2D(point.X/lenght, point.Y/lenght);
    }

    static setMagnitude (point, value) {
        var nPoint = this.normalize(point);
        nPoint.X *= value;
        nPoint.Y *= value;
        return nPoint;
    }

    static limit(point, value) { 
        var lenght = this.distanse(point);  
        if(lenght > Math.pow(value, 2)) {        
            point.X /= lenght;
            point.Y /= lenght;
        }
        return point;
    };

}
