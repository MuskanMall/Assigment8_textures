
class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
        
        if(subdivisions < 1) subdivisions = 1
        
        var x0 = -0.5;
        var y0 = -0.5;
        var incr = 1.0/subdivisions;
        var t1 = 0;
        
        for (t1 = 0; t1 < subdivisions; t1++) {
            var valy = (t1* incr);
            var t2;
            for (t2=0; t2<subdivisions; t2++) {
                var valx = (t2 * incr)
                
                // Front
                this.addTriangle(x0+valx,y0+valy, 0.5, x0+valx+incr,y0+valy ,0.5, x0+valx+incr, y0+valy+incr, 0.5)
                this.adduv (valx, valy, valx+incr, valy, valx+incr, valy+incr);
                this.addTriangle(x0+valx+incr,y0+valy+incr, 0.5, x0+valx,y0+valy+incr,0.5, x0+valx, y0+valy, 0.5)
                this.adduv (valx+incr, valy+incr, valx, valy+incr, valx, valy);
                
                // Back
                this.addTriangle(x0+valx,y0+valy , -0.5, x0+valx+incr, y0+valy+incr, -0.5, x0+valx+incr, y0+valy,-0.5)
                this.adduv (valx, valy, valx+incr, valy+incr, valx+incr, valy);
                this.addTriangle(x0+valx,y0+valy, -0.5, x0+valx, y0+valy+incr, -0.5,  x0+valx+incr, y0+valy+incr,-0.5)
                this.adduv (valx, valy, valx, valy+incr, valx+incr, valy+incr );
                
                // Left Face
                this.addTriangle(-0.5, y0+valy, x0+valx, -0.5, y0+valy, x0+valx+incr, -0.5, y0+valy+incr, x0+valx+incr)
                this.adduv (valx, valy, valx+incr, valy, valx+incr, valy+incr );
                this.addTriangle(-0.5, y0+valy+incr, x0+valx+incr, -0.5, y0+valy+incr, x0+valx, -0.5, y0+valy, x0+valx)
                this.adduv (valx+incr, valy+incr, valx, valy+incr, valx,  valy);
                
                // Right Face
                this.addTriangle(0.5, y0+valy, x0+valx+incr, 0.5, y0+valy, x0+valx, 0.5, y0+valy+incr, x0+valx)
                this.adduv (valx+incr, valy, valx, valy, valx, valy+incr );
                this.addTriangle(0.5, y0+valy+incr, x0+valx, 0.5, y0+valy+incr, x0+valx+incr, 0.5, y0+valy, x0+valx+incr)
                this.adduv (valx, valy+incr, valx+incr, valy+incr, valx+incr, valy );
                
                // Top Face
                this.addTriangle(x0+valx, 0.5, y0+valy+incr, x0+valx+incr, 0.5, y0+valy+incr, x0+valx, 0.5, y0+valy)
                this.adduv (valx, valy+incr, valx+incr, valy+incr, valx,valy);
                this.addTriangle(x0+valx, 0.5, y0+valy, x0+valx+incr, 0.5, y0+valy+incr, x0+valx+incr, 0.5, y0+valy)
                this.adduv (valx,valy,valx+incr,valy+incr,valx+incr,valy)
                
                // Bottom Face
                this.addTriangle(x0+valx, -0.5, y0+valy, x0+valx+incr, -0.5, y0+valy+incr, x0+valx, -0.5, y0+valy+incr)
                this.adduv (valx,valy, valx+incr, valy+incr, valx, valy+incr );
                this.addTriangle(x0+valx, -0.5, y0+valy, x0+valx+incr, -0.5, y0+valy, x0+valx+incr, -0.5, y0+valy+incr)
                this.adduv (valx, valy, valx+incr, valy,valx+incr, valy+incr);
                }
        }
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
        
        var y0 = -0.5;
        var y1 = 0.5;
        
        var radius = 0.5;
                
        if(radialdivision < 3) radialdivision = 3;
        if(heightdivision < 1) heightdivision = 1
                
        var angles = 360.0 /radialdivision;
        var incr = 1.0/heightdivision;
        
        // caps
        var i, j;
        var t2 = 0.0;
        let x0, z0, x1, z1, x2, y2, z2;
        for (i=0; i < radialdivision;i++) {
            x0 = radius * Math.cos(radians(t2))
            z0 = radius * Math.sin(radians(t2))
                 
            x1 = radius * Math.cos(radians(t2+angles))
            z1 = radius * Math.sin(radians(t2+angles))
            
            //bottom cylinder
            this.addTriangle(x0,y0,z0,0,y0,0,x1,y0,z1)
            //top cylinder
            this.addTriangle(x1,y1,z1,0,y1,0,x0,y1,z0)
            
            t2 += angles;
        }
        
        // sides
        for (i=0; i < heightdivision; i++) {
            var val = i * incr;
            t2 =0.0;
            for (j=0; j < radialdivision; j++) {
                x0 = radius * Math.cos(radians(t2));
                z0 = radius * Math.sin(radians(t2));
                
                x1 = radius * Math.cos(radians(t2+angles));
                z1 = radius * Math.sin(radians(t2+angles));
                
                // connect the faces with suitable y subdivision
                this.addTriangle(x0,y0+val,z0,x1,y0+val,z1,x1,y0+val+incr,z1);
                this.addTriangle(x0,y0+val,z0,x1,y0+val+incr,z1,x0,y0+val+incr,z0);
                
                t2 += angles;
            }
        }
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    
    let y0 = -0.5;
    let y1 = 0.5;
    let radius = 0.5;
    
    if(radialdivision < 3) radialdivision = 3;
    if(heightdivision < 1) heightdivision = 1
            
    let angles = 360.0 /radialdivision;
    let incr = 1.0/heightdivision;
            
    var i, j;
    for (i=0; i < heightdivision; i++) {
        let val = i * incr;
        let t1 = i;
        let t2 = 0.0;
        for (j = 0; j < radialdivision; j++) {
            
            let x0 = radius * Math.cos(radians(t2));
            let z0 = radius * Math.sin(radians(t2));
                              
            let x1 = radius * Math.cos(radians(t2+angles));
            let z1 = radius * Math.sin(radians(t2+angles));
                            
            this.addTriangle(x0,y0,z0,0.0,y0,0.0,x1,y0,z1);
                             
            let radius_bot = radius * (1.0 - (t1*incr));
                            
            let x0_bot = radius_bot * Math.cos(radians(t2));
            let z0_bot = radius_bot * Math.sin(radians(t2));
                            
            let x1_bot = radius_bot * Math.cos(radians(t2+angles));
            let z1_bot = radius_bot * Math.sin(radians(t2+angles));
            
            let radius_top = radius * (1.0 - ((t1+1)*incr));
            
            let x0_top = radius_top * Math.cos(radians(t2));
            let z0_top = radius_top * Math.sin(radians(t2));
                            
            let x1_top = radius_top * Math.cos(radians(t2+angles));
            let z1_top = radius_top * Math.sin(radians(t2+angles));
                            
            radius_bot = radius_top;
                            
            //connect the faces with suitable y subdivision
        this.addTriangle(x1_bot,y0+val,z1_bot,x0_top,y0+val+incr,z0_top,x0_bot,y0+val,z0_bot);
        this.addTriangle(x1_bot,y0+val,z1_bot,x1_top,y0+val+incr,z1_top,x0_top,y0+val+incr,z0_top);
            t2 += angles;
            }
        }
    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
        //let y0 = 0.5;
        //let y1 = -0.5;
        let x0, y0, z0, x1, y1, z1, x2, y2, z2;
        let u0, v0, u1, v1, u2, v2;
        let radius = 0.5;
                
        if(slices < 3) slices = 3;
        if(stacks < 3) stacks = 3;
        
        let thetadist = 6.28 / slices;
        let phidist = 3.14 / stacks;
        
        let udist = 1.0 / slices;
        let vdist = 1.0 / stacks;
        
        let phi = phidist;
        let theta = 0.0;
        let thisSinPhi = 0.0;
        let thisCosPhi = 1.0;
        let u = 0.0;
        let v = 0.0;
        
        let nextSinPhi  = Math.sin(phidist);
        let nextCosPhi = Math.cos(phidist);
        
        let thisZ = radius;
        let nextZ = radius * nextCosPhi;
        
        // Top cone
        var i,j;
        u=1.0;
        for (j=0; j < slices;j++) {
            
            v = 0.0;
        
            let thisSinTheta = Math.sin(theta);
            let thisCosTheta = Math.cos(theta);
        
            let nextSinTheta = Math.sin(theta + thetadist);
            let nextCosTheta = Math.cos(theta + thetadist);
            
            x0 = 0.0;
            y0 = radius;
            z0 = 0.0;
            u0 = 0.0;
            v0 = 0.0;
            
            x1 = (nextCosTheta*nextSinPhi*radius);
            y1 = nextZ;
            z1 = (nextSinTheta*nextSinPhi*radius);
            u1 = u - udist;
            v1 = v + vdist;
            
            x2 = (thisCosTheta*nextSinPhi*radius);
            y2 = nextZ;
            z2 = (thisSinTheta*nextSinPhi*radius);
            u2 = u;
            v2 = v + vdist;
            
            this.addTriangle(x0, y0, z0, x2, y2, z2, x1, y1, z1);
            this.addNormal (x0, y0, z0, x2, y2, z2, x1, y1, z1);
            this.adduv (u0, v0, u2, v2, u1, v1);
            
            theta += thetadist
            u -= udist;
            
        }
        
        // Interior stacks
        //v = vdist;
        v = vdist;
        for (i = 1; i < stacks; i++) {
            
            thisSinPhi = Math.sin(phi);
            thisCosPhi = Math.cos(phi);
            nextSinPhi = Math.sin(phi + phidist);
            nextCosPhi = Math.cos(phi + phidist);
            thisZ = radius * thisCosPhi;
            nextZ = radius * nextCosPhi;
            
            theta = 0.0;
            //u = 0.0;
            u = 1.0;
            for (j=0; j<=slices; j++) {
                let thisSinTheta= Math.sin(theta);
                let thisCosTheta = Math.cos(theta);
                let nextSinTheta = Math.sin(theta + thetadist);
                let nextCosTheta = Math.cos(theta + thetadist);
                
                x0 = (thisCosTheta*thisSinPhi*radius);
                y0 = thisZ;
                z0 = (thisSinTheta*thisSinPhi*radius);
                u0 = u;
                v0 = v;
                
                x1 = (nextCosTheta*thisSinPhi*radius);
                y1 = thisZ;
                z1 = (nextSinTheta*thisSinPhi*radius);
                u1 = u - udist;
                v1 = v;
                
                x2 = (thisCosTheta*nextSinPhi*radius);
                y2 = nextZ;
                z2 = (thisSinTheta*nextSinPhi*radius);
                u2 = u;
                v2 = v + vdist;

                
                this.addTriangle(x2, y2, z2, x1, y1, z1, x0, y0, z0);
                this.addNormal (x2, y2, z2, x1, y1, z1, x0, y0, z0);
                this.adduv (u2, v2, u1, v1, u0, v0);
                
                x0 = (nextCosTheta*thisSinPhi*radius);
                y0 = thisZ;
                z0 = (nextSinTheta*thisSinPhi*radius);
                u0 = u - udist;
                v0 = v;
                
                x1 = (nextCosTheta*nextSinPhi*radius);
                y1 = nextZ;
                z1 = (nextSinTheta*nextSinPhi*radius);
                u1 = u - udist;
                v1 = v + vdist;
                
                x2 = (thisCosTheta*nextSinPhi*radius);
                y2 = nextZ;
                z2 = (thisSinTheta*nextSinPhi*radius);
                u2 = u;
                v2 = v + vdist
            
                
                this.addTriangle(x0, y0, z0, x2, y2, z2, x1, y1, z1);
                this.addNormal (x0, y0, z0, x2, y2, z2, x1, y1, z1);
                this.adduv (u0, v0, u2, v2, u1, v1);
                
                theta += thetadist;
                u -= udist;
        
            }
            
            phi += phidist;
            v+= vdist;
        }
        
        // Lower pole
        u = 1.0;
        v = 1.0;
        theta = 0.0;
        thisSinPhi = Math.sin(phi);
        thisCosPhi = Math.cos(phi);
        nextSinPhi = 0.0;
        nextCosPhi = -1.0;
        thisZ = radius * thisCosPhi;
        nextZ = -1.0 * radius;
        
        for (j=0; j < slices; j++) {
            let thisSinTheta = Math.sin(theta);
            let thisCosTheta = Math.cos(theta);
            let nextSinTheta = Math.sin(theta + thetadist);
            let nextCosTheta = Math.cos(theta + thetadist);
            
            x0 = (thisCosTheta*thisSinPhi*radius);
            y0 = nextZ;
            z0 = (thisSinTheta*thisSinPhi*radius);
            u0 = u;
            v0 = v;
            
            x1 = (nextCosTheta*thisSinPhi*radius);
            y1 = nextZ;
            z1 = (nextSinTheta*thisSinPhi*radius);
            u1 = u - udist;
            v1 = v;
            
            x2 = 0.0;
            y2 = -1.0 * radius;
            z2 = 0.0;
            u2 = 1.0;
            v2 = 1.0;
               
            this.addTriangle(x0, y0, z0, x2, y2, z2, x1, y1, z1);
            this.addNormal (x0, y0, z0, x2, y2, z2, x1, y1, z1);
            this.adduv (u0, v0, u2, v2, u1, v1);
               
            theta += thetadist;
            u -= udist;
        }

    }

    
    
}


