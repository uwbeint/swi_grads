*Run Script without Display with follow command:
*Command: grads -h GD -blcx "run aws_uwbe_swe.gs DOMAIN DATE HOUR CYCLE"
*Example for Use this Script: grads -h GD -blcx "run aws_uwbe_swe.gs ch4km 20201212 12 74"
*Script by Dominic Kurz, UwBe International
*meteo@weather.uwbeinternational.org

function main(args)

******************************
* SWI - Severe Weather Index *
******************************

*******************************************************************

  domain = subwrd(args,1)
  date = subwrd(args,2)
  hour  = subwrd(args,3)
  hours = subwrd(args,4)

*******************************************************************

'sdfopen https://nomads.ncep.noaa.gov/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'

if (domain = 'it4km') ; dom="it4km" ; endif
if (domain = 'ch4km') ; dom="ch4km" ; endif

i = 1

while (i < hours)
   say 'i = 'i
   if (dom = 'it4km')
      'set lon 6.85 18.5'
      'set lat 37.08 46.25'
#Wenn Draw Title unten verwendet wird: set parea 0 8.5 1 10.5, falls KEIN Titel verwendet wird, dann set parea 0 8.5 1 11
#'set parea 0 8.5 1 10.5'
       endif
   if (dom = 'ch4km')
      'set lon 5.5 11'
      'set lat 45 48.5'
#Wenn Draw Title unten verwendet wird: set parea 0 8.5 1 10.5, falls KEIN Titel verwendet wird, dann set parea 0 8.5 1 11
#'set parea 0 8.5 1 10.5'
     endif

        'set map 1 1 7'

   'set t 'i
   'q time'
   if (i = 1)
  runwrd=subwrd(result,3)
  cyc=substr(runwrd,1,2)
  say 'cyc = 'cyc
  rundate=substr(runwrd,4,2)
  runmo=substr(runwrd,6,3)
  runyear=substr(runwrd,9,4)
  'q files'
  runlin=sublin(result,1)
  say 'runlin = 'runlin
  runwrd=subwrd(runlin,4)
  runfile=substr(runwrd,1,10)
   endif
   'q time'
   fwrd=subwrd(result,3)
   fhr=substr(fwrd,1,2)
   fdate=substr(fwrd,4,2)
   fmo=substr(fwrd,6,3)
   fyear=substr(fwrd,9,4)

if (borders = "shp")
'set mpdraw off'
endif

xcbarside = "r"

* Map options & resolution
**************************
'set mproj scaled'
'set mpvals -2 19 47 59'
'set display color white'
'set csmooth on'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
 if (dom = 'it4km')
 if (xcbarside = 'l')
'set parea 1.05 11 1 8.1'
 endif
 if (xcbarside = 'r')
'set parea 0 10 1 8.1'
 endif
 endif
 if (dom = 'ch4km')
 if (xcbarside = 'l')
'set parea 1.05 11 1 8.1'
 endif
 if (xcbarside = 'r')
'set parea 0 10 1 8.1'
 endif
 endif
 'set grads off'
'set grid off'

'set gxout shaded'

if (domain = 'ch4km')
'set line 1 1 6'
'draw shp /home/uwbe/uems/grads_scripts/shp/CHE_water_areas_dcw.shp'
endif

if (domain = 'it4km')
'set line 1 1 6'
'draw shp /home/uwbe/uems/grads_scripts/shp/ITA_water_areas_dcw.shp'
endif

* Colortable
************
*Level < 1 = white / Level 1 = Orange / level 2 = Red / Level 3 = Purple
'/home/uwbe/uems/grads_scripts/auto_without_sim/color.gs 0 3 0.2 -gxout shaded -kind (255,255,255)->(245,176,73)->(242,41,41)->(242,41,229)'

* Declaration variables & calculations
**************************************  
*Temp 2m
'define t2m  = const((tmp2m-273.16),0,-u)'

*LCL 1
'define LCL = (20+(t2m/5)) * (100 - rh2m)'

*U-components
'define u1000=ugrdprs(lev=1000)'
'define u975=ugrdprs(lev=975)'
'define u950=ugrdprs(lev=950)'
'define u925=ugrdprs(lev=925)'
'define u900=ugrdprs(lev=900)'
'define u850=ugrdprs(lev=850)'
'define u800=ugrdprs(lev=800)'
'define u750=ugrdprs(lev=750)'
'define u700=ugrdprs(lev=700)'
'define u650=ugrdprs(lev=650)'
'define u600=ugrdprs(lev=600)'
'define u550=ugrdprs(lev=550)'
'define u500=ugrdprs(lev=500)'
'define u450=ugrdprs(lev=450)'
'define u400=ugrdprs(lev=400)'

*V-components
'define v1000=vgrdprs(lev=1000)'
'define v975=vgrdprs(lev=975)'
'define v950=vgrdprs(lev=950)'
'define v925=vgrdprs(lev=925)'
'define v900=vgrdprs(lev=900)'
'define v850=vgrdprs(lev=850)'
'define v800=vgrdprs(lev=800)'
'define v750=vgrdprs(lev=750)'
'define v700=vgrdprs(lev=700)'
'define v650=vgrdprs(lev=650)'
'define v600=vgrdprs(lev=600)'
'define v550=vgrdprs(lev=550)'
'define v500=vgrdprs(lev=500)'
'define v450=vgrdprs(lev=450)'
'define v400=vgrdprs(lev=400)'

*Shear parameters - OLD
*'define umean=(u1000+u975+u950+u925+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/15.0'
*'define vmean=(v1000+v975+v950+v925+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+v400)/15.0'
*'define ushear=u450-u1000'
*'define vshear=v450-v1000'
*'define shear=sqrt(ushear*ushear+vshear*vshear)'
*'define umotion=((umean+(7.5/(shear))*vshear))'
*'define vmotion=((vmean-(7.5/(shear))*ushear))'

*Shear parameters V2.0
'define umean=(u1000+u950+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/13.0'
'define vmean=(v1000+v950+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+v400)/13.0'
'define ushear=u500-u1000'
'define vshear=v500-v1000'
'define shear=sqrt(ushear*ushear+vshear*vshear)'
'define umotion=((umean+(7.5/(shear))*vshear))'
'define vmotion=((vmean-(7.5/(shear))*ushear))'

*SRH steps V2.0
'define srh1=((u950-umotion)*(v1000-vmotion)-(u1000-umotion)*(v950-vmotion))'
'define srh2=((u900-umotion)*(v950-vmotion)-(u950-umotion)*(v900-vmotion))'
'define srh3=((u850-umotion)*(v900-vmotion)-(u900-umotion)*(v850-vmotion))'
'define srh4=((u800-umotion)*(v850-vmotion)-(u850-umotion)*(v800-vmotion))'
'define srh5=((u750-umotion)*(v800-vmotion)-(u800-umotion)*(v750-vmotion))'
'define srh6=((u700-umotion)*(v750-vmotion)-(u750-umotion)*(v700-vmotion))'

*SRH 1 & 3km V2.0
'define srh3km=srh1+srh2+srh3+srh4+srh5+srh6'
'define srh1km=srh1+srh2'

*SRH steps for integration - OLD
*'define srh1=((u975-umotion)*(v1000-vmotion)-(u1000-umotion)*(v975-vmotion))'
*'define srh2=((u950-umotion)*(v975-vmotion)-(u975-umotion)*(v950-vmotion))'
*'define srh3=((u925-umotion)*(v950-vmotion)-(u950-umotion)*(v925-vmotion))'
*'define srh4=((u900-umotion)*(v925-vmotion)-(u925-umotion)*(v900-vmotion))'
*'define srh5=((u850-umotion)*(v900-vmotion)-(u900-umotion)*(v850-vmotion))'
*'define srh6=((u800-umotion)*(v850-vmotion)-(u850-umotion)*(v800-vmotion))'
*'define srh7=((u750-umotion)*(v800-vmotion)-(u800-umotion)*(v750-vmotion))'
*'define srh8=((u700-umotion)*(v750-vmotion)-(u750-umotion)*(v700-vmotion))'

*SRH1 & 3 km - OLD
*'define srh3km=srh1+srh2+srh3+srh4+srh5+srh6+srh7+srh8'
*'define srh1km=srh1+srh2+srh3+srh4'

*Shearterm
'define shearterm = (shear/20)'
'shearterm = const(maskout(shearterm, shearterm-0.5),0,-u)'
'shearterm = const(maskout(shearterm, 1-shearterm),1,-u)'

*LCLterm
'define LCLterm = ((2000-LCL)/1000)'

*Supercelcomposite
'define scp = ((capesfc/1000) * (shearterm) * (srh3km/50))'

*Significant tornado (fixed)
'define stp = ((capesfc/1500) * LCLterm * (srh1km/150) * shearterm)'

*Deep Level Shear
'define dls = mag(abs(u500-ugrd10m),abs(v500-vgrd10m))'

*Low Level Sehar
'define lls = mag(abs(u900-ugrd10m),abs(v900-vgrd10m))'

*********************************************************************************
* Thunderstorm (50% probability of thunderstorms occurin in the designated Area) *
*********************************************************************************

*Conditions
***********
*CAPE 255-0hPa >= 500J/kg AND best 4 layer lifted index <= -2
*Color: rgb 242 215 41
  
if (cape255_0mb>= 500&no4lftxsfc<=-2)
*//TODO: Draw yellow Line for 50% probability of thunderstorms around the Area
*//TODO: Draw 50% Thunderstorm probability
endif

************************************************************************
* Level 1: 5% Chance of a severe Thunderstorm, large hail or a Tornado *
************************************************************************

*Conditions
***********
*CAPE 255-0hPa >= 500J/kg AND low level shear >=10m/s AND deep layer shear >= 10m/s AND 3km storm relative helicity (SRH) >=100m2/s2
*OR large hail probability (NCEP/SPC Formula) >= 30%
*OR surface based supercell composite parameter >= 3.5
*OR surface based significant tornado parameter >= 1.2

if((cape255_0mb>= 500&lls>= 10&dls>= 10&srh3km>= 100) | (scp>=3.5) | (stp>=1.2))
*//TODO: Drawing Lines around the Level 1 Area (orange line)
*//DRAW LEVEL 1
endif

*************************************************************************
* Level 2: 10% Chance of a severe Thunderstorm, large hail or a Tornado *
*************************************************************************

*Conditions
***********
*CAPE 255-0hPa >= 1000J/kg AND low level shear >=15m/s AND deep layer shear >= 20m/s AND 3km storm relative helicity (SRH) >=150m2/s2
*OR large hail probaility (NCEP/SCP Forumlar) >= 99%
*OR surface based supercell composite parameter >= 7.5
*OR surface based significant tornado parameter >= 2.5

if ((cape255_0mb>= 1000&lls>= 15&dls>= 20&srh3km>= 150) | (scp>=7.5) | (stp>=2.5))
*//TODO: Drawing Lines around the Level 2 Area (red line)
*//DRAW LEVEL 2
endif

*************************************************************************
* Level 3: 15% Chance of a severe Thunderstorm, large hail or a Tornado *
*************************************************************************

*Conditions
***********
*CAPE 255-0hPa >= 2000J/kg AND low level shear >=20m/s AND deep layer shear >= 25m/s AND 3km storm relative helicity (SRH) >=200m2/s2
*OR surface based supercell composite parameter >= 15
*OR surface based significant tornado parameter >= 5

if ((cape255_0mb>= 2000&lls>= 20&dls>= 25&srh3km>= 200) | (scp>=15) | (stp>=5))
*//TODO: Drawing Lines around the Level 3 Area (purple line)
*//DRAW LEVEL 3
endif

*DUMMY DISPLAY IF NO VALUES  THERE! WTF, HOW I CAN DRAW SHAPEFILE ALSO IF NO VALUES AVAILABLE?
'd scp'

'/home/uwbe/uems/grads_scripts/auto_without_sim/plot_cities_'dom
   ghr = i - 1

'set strsiz 0.15 0.15'
'draw string 0.4 8.33 UwBe International - Severe Weather Index (Forecast & Warning Areas)'
    if (domain = 'ch4km') ; gtx="Switzerland 3km Grid" ; endif
    if (domain = 'it4km') ; gtx="Italy 3km Grid" ; endif

*if(xcbarside = 'l')
*#xcbar left
*'/home/uwbe/uems/grads_scripts/auto_without_sim/xcbar 0.28 0.53 1 8.1 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

*'set strsiz 0.12'
*'set string 1 r 3 270' ; 'draw string 0.15 1.05 <-- higher means increased potential & severity for/of BowEchos ->'
*endif

*if(xcbarside = 'r')
*#xcbar right
*'/home/uwbe/uems/grads_scripts/auto_without_sim/xcbar 10.25 10.5 1.05 8.05 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'
*'set strsiz 0.12'
*'set string 1 r 3 270' ; 'draw string 10.13 1.05 <-- higher means increased potential & severity for/of BowEchos ->'
*endif

#Set Boxes under the Chart
'set line 0 1 2'
'draw recf 0 0.5 2.5 1'
'draw recf 0 0 2.5 0.5'
'draw recf 8.5 0 11 1'
'draw recf 8.5 0.5 11 1'

'set line 1 1 2' 
'draw rec 0 0.5 2.5 1'
'draw rec 0 0 2.5 0.5'
'draw rec 8.5 0 11 1'
'draw rec 8.5 0.5 11 1'

#Draw ARW/NMM Text Box Left
'set string 1 bl 6 0'
'set strsiz 0.095 0.095'
'draw string 0.15 0.8 NMM/ARW'
'set string 1 bl 0'
'draw string 1 0.8 v4.2.1 3km Grid'
'set strsiz 0.085 0.085'
'draw string 0.15 0.6 (c)weather.uwbeinternational.org'

#Draw Text in the right 2nd bottom Box
'set string 1 bl 4'
'set strsiz 0.1 0.1'
'draw string 0.15 0.2 Run: 'rundate' 'runmo' 'runyear'_'cyc' UTC'

#Draw Text in the right bottom Box
'set strsiz 0.1 0.1'
'set string 1 bl 5'
'draw string 9.5 0.8 Valid'
'set string 1 bl 6'
'draw string 8.85 0.6 'fdate' 'fmo' 'fyear'_'fhr' UTC'
'set string 1 bl 5'
'set strsiz 0.1 0.1'
'draw string 9 0.3 UwBe International'
'draw string 8.7 0.15 Severe Weather Research'

#Draw Text in the middle white field
'set string 1 bl 4'
'set strsiz 0.1 0.1'
'draw string 2.7 0.78 Line 1'
'draw string 2.7 0.58 Line 2'
'draw string 2.7 0.38 Line 3'
'draw string 2.7 0.18 Line 4'

#Draw Lines in Picture
'set line 1 1 2'
'draw line 0 0.01 11 0.01'
'draw line 10.99 0 10.99 8.1'
'draw line 0 8.1 11 8.1'

if (ghr < 10)
*'printim /home/uwbe/uems/runs/'domain'/wrf_out/auto_without_sim/uwbe_swe_index/'cyc'/uwbe_swe_index_'runfile'f0'ghr'.png x950 y950 png white'

'printim /home/uwbe/uems/runs/experimental/uwbe_swe_index_'runfile'f0'ghr'.png x950 y950 png white'
else

*'printim /home/uwbe/uems/runs/'domain'/wrf_out/auto_without_sim/uwbe_swe_index/'cyc'/uwbe_swe_index_'runfile'f'ghr'.png x950 y950 png white'

'printim /home/uwbe/uems/runs/experimental/uwbe_swe_index_'runfile'f'ghr'.png x950 y950 png white'

endif
   'clear'
   i = i + 1
endwhile
