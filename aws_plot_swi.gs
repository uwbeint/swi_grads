******************************
* SWI – Severe Weather Index *
******************************

* Declaration variables & calculations
**************************************
*Temp 2m
‚define t2m = const((tmp2m-273.16),0,-u)‘

*LCL 1
‚define LCL = (20+(t2m/5)) * (100 – rh2m)‘

*U-components
‚define u1000=ugrdprs(lev=1000)‘
‚define u975=ugrdprs(lev=975)‘
‚define u950=ugrdprs(lev=950)‘
‚define u925=ugrdprs(lev=925)‘
‚define u900=ugrdprs(lev=900)‘
‚define u850=ugrdprs(lev=850)‘
‚define u800=ugrdprs(lev=800)‘
‚define u750=ugrdprs(lev=750)‘
‚define u700=ugrdprs(lev=700)‘
‚define u650=ugrdprs(lev=650)‘
‚define u600=ugrdprs(lev=600)‘
‚define u550=ugrdprs(lev=550)‘
‚define u500=ugrdprs(lev=500)‘
‚define u450=ugrdprs(lev=450)‘
‚define u400=ugrdprs(lev=400)‘

*V-components
‚define v1000=vgrdprs(lev=1000)‘
‚define v975=vgrdprs(lev=975)‘
‚define v950=vgrdprs(lev=950)‘
‚define v925=vgrdprs(lev=925)‘
‚define v900=vgrdprs(lev=900)‘
‚define v850=vgrdprs(lev=850)‘
‚define v800=vgrdprs(lev=800)‘
‚define v750=vgrdprs(lev=750)‘
‚define v700=vgrdprs(lev=700)‘
‚define v650=vgrdprs(lev=650)‘
‚define v600=vgrdprs(lev=600)‘
‚define v550=vgrdprs(lev=550)‘
‚define v500=vgrdprs(lev=500)‘
‚define v450=vgrdprs(lev=450)‘
‚define v400=vgrdprs(lev=400)‘

*Shear parameters – OLD
*’define umean=(u1000+u975+u950+u925+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/15.0′
*’define vmean=(v1000+v975+v950+v925+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+v400)/15.0′
*’define ushear=u450-u1000′
*’define vshear=v450-v1000′
*’define shear=sqrt(ushear*ushear+vshear*vshear)‘
*’define umotion=((umean+(7.5/(shear))*vshear))‘
*’define vmotion=((vmean-(7.5/(shear))*ushear))‘

*Shear parameters V2.0
‚define umean=(u1000+u950+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/13.0‘
‚define vmean=(v1000+v950+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+v400)/13.0‘
‚define ushear=u500-u1000‘
‚define vshear=v500-v1000‘
‚define shear=sqrt(ushear*ushear+vshear*vshear)‘
‚define umotion=((umean+(7.5/(shear))*vshear))‘
‚define vmotion=((vmean-(7.5/(shear))*ushear))‘

*SRH steps V2.0
‚define srh1=((u950-umotion)*(v1000-vmotion)-(u1000-umotion)*(v950-vmotion))‘
‚define srh2=((u900-umotion)*(v950-vmotion)-(u950-umotion)*(v900-vmotion))‘
‚define srh3=((u850-umotion)*(v900-vmotion)-(u900-umotion)*(v850-vmotion))‘
‚define srh4=((u800-umotion)*(v850-vmotion)-(u850-umotion)*(v800-vmotion))‘
‚define srh5=((u750-umotion)*(v800-vmotion)-(u800-umotion)*(v750-vmotion))‘
‚define srh6=((u700-umotion)*(v750-vmotion)-(u750-umotion)*(v700-vmotion))‘

*SRH 1 & 3km V2.0
‚define srh3km=srh1+srh2+srh3+srh4+srh5+srh6‘
‚define srh1km=srh1+srh2‘

*SRH steps for integration – OLD
*’define srh1=((u975-umotion)*(v1000-vmotion)-(u1000-umotion)*(v975-vmotion))‘
*’define srh2=((u950-umotion)*(v975-vmotion)-(u975-umotion)*(v950-vmotion))‘
*’define srh3=((u925-umotion)*(v950-vmotion)-(u950-umotion)*(v925-vmotion))‘
*’define srh4=((u900-umotion)*(v925-vmotion)-(u925-umotion)*(v900-vmotion))‘
*’define srh5=((u850-umotion)*(v900-vmotion)-(u900-umotion)*(v850-vmotion))‘
*’define srh6=((u800-umotion)*(v850-vmotion)-(u850-umotion)*(v800-vmotion))‘
*’define srh7=((u750-umotion)*(v800-vmotion)-(u800-umotion)*(v750-vmotion))‘
*’define srh8=((u700-umotion)*(v750-vmotion)-(u750-umotion)*(v700-vmotion))‘

*SRH1 & 3 km – OLD
*’define srh3km=srh1+srh2+srh3+srh4+srh5+srh6+srh7+srh8′
*’define srh1km=srh1+srh2+srh3+srh4′

*Shearterm
‚define shearterm = (shear/20)‘
’shearterm = const(maskout(shearterm, shearterm-0.5),0,-u)‘
’shearterm = const(maskout(shearterm, 1-shearterm),1,-u)‘

*LCLterm
‚define LCLterm = ((2000-LCL)/1000)‘

*Temperature at LCL
‚define tlcl=(((1/(1/(dewp2m-56)+log((tmp2m/dewp2m))/800))+56)-273.16)‘

*Totals Totals Index (TTI)
‚define ttindex = tc850mb+dewp850mb-(2*tc500mb)‘

*Windchill
‚define windchill2m = 13.12+(0.6215*tc2m)-(11.37*pow((mag(ugrd10m,vgrd10m)*3.6),0.16)) + (0.3965*tc2m*pow((mag(ugrd10m,vgrd10m)*3.6),0.16))‘

*Pressure at LCL
‚define plcl=(pressfc*pow(((tlcl+273.16)/tmp2m),(7/2)))/100‘

*Supercelcomposite
‚define scp = ((capesfc/1000) * (shearterm) * (srh3km/50))‘

*Significant tornado (fixed)
‚define stp = ((capesfc/1500) * LCLterm * (srh1km/150) * shearterm)‘

*Deep Level Shear
‚define dls = mag(abs(u500-ugrd10m),abs(v500-vgrd10m))‘

*Low Level Sehar
‚define lls = mag(abs(u900-ugrd10m),abs(v900-vgrd10m))‘

*********************************************************************************
* Thunderstorm (50% probaility of thunderstorms occurin in the designated Area) *
*********************************************************************************

*Conditions
***********
if (cape255_0mb>= 500&no4lftxsfc<=-2)
ths_prob = ‚1‘;
else
ths_prob = ‚0‘;
endif

************************************************************************
* Level 1: 5% Chance of a severe Thunderstorm, large hail or a Tornado *
************************************************************************

*Conditions
***********
*cape255_0mb >= 500J/kg AND low level shear >=10m/s AND deep layer shear >= 10m/s AND 3km SRH >=100m2/s2
if((cape255_0mb>= 500&lls>= 10&dls>= 10&srh3km>= 100) | (scp>=3.5) | (stp>=1.2))
*DRAW LEVEL 1

else if ((cape255_0mb>= 1000&lls>= 15&dls>= 20&srh3km>= 150) | (scp>=7.5) | (stp>=2.5))

*************************************************************************
* Level 2: 10% Chance of a severe Thunderstorm, large hail or a Tornado *
*************************************************************************

*Conditions
***********
*DRAW LEVEL 2
else if ((cape255_0mb>= 2000&lls>= 20&dls>= 25&srh3km>= 200) | (scp>=15) | (stp>=5))

*************************************************************************
* Level 3: 15% Chance of a severe Thunderstorm, large hail or a Tornado *
*************************************************************************

*Conditions
***********
*DRAW LEVEL 3
endif
