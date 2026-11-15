/* Offline fallback for file:// protocol */
window.EMBEDDED_INVESTIGATIONS_DATA = {
  "meta": {
    "generated": "2026-11-09",
    "source": "NASA PSI Database",
    "total": 20
  },
  "scenarios": [
    {
      "id": "spacecraft",
      "label": "Spacecraft / ISS",
      "icon": "rocket"
    },
    {
      "id": "moon_base",
      "label": "Lunar Base",
      "icon": "moon"
    },
    {
      "id": "mars",
      "label": "Mars Mission",
      "icon": "globe"
    },
    {
      "id": "rover",
      "label": "Pressurized Rover",
      "icon": "truck"
    },
    {
      "id": "earth",
      "label": "Earth Applications",
      "icon": "home"
    }
  ],
  "investigations": [
    {
      "id": "FLEX",
      "name": "Flame Extinguishment Experiment",
      "short_name": "FLEX",
      "description": "FLEX studied flame extinguishment of heptane and other liquid fuels in microgravity using the Multi-User Droplet Combustion Apparatus inside the Combustion Integrated Rack.",
      "fuel_type": "liquid",
      "fuel_material": "heptane",
      "hardware": "MDCA in CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "gas analyzer"
      ],
      "objectives": [
        "Measure extinction limits of liquid fuel droplets in microgravity",
        "Determine effect of oxygen concentration on flame stability",
        "Validate radiative extinction theory"
      ],
      "key_findings": [
        "Radiative extinction observed at low strain rates",
        "Low-stretch flames can extinguish without suppression",
        "Extinction boundaries mapped across O\u2082 and pressure"
      ],
      "variables": [
        "oxygen %",
        "flow speed",
        "fuel diameter",
        "pressure"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 8,
        "mars": 7,
        "rover": 7,
        "earth": 8
      },
      "earth_application": "Improved fine-water-mist fire suppression systems and combustion models.",
      "year": 2012,
      "duration_days": 90,
      "sample_count": 42,
      "si_summary": "FLEX is the definitive database for liquid-fuel extinction in microgravity, giving lunar habitat designers a calibrated envelope.",
      "tags": [
        "suppression",
        "droplet",
        "extinction",
        "liquid"
      ],
      "flame_metrics": {
        "flame_temp_k": 1650,
        "flame_spread_rate_mms": 1.2,
        "loc_pct": 14.8,
        "quenching_distance_mm": 8.5,
        "radiative_fraction_pct": 38,
        "soot_volume_fraction_ppm": 0.8,
        "smoke_obscuration_od_m": 0.42,
        "co_co2_ratio": 0.08,
        "critical_heat_flux_kw_m2": 16.5,
        "cool_flame_capable": false,
        "flame_geometry": "Spherical Micro-Orb",
        "flame_color": "Dual-Zone Blue Base / Amber Halos",
        "fsrl_level": 8,
        "extinguishment_method": "Radiative Extinction / Water Mist (50-100 \u03bcm)"
      }
    },
    {
      "id": "FLEX-2",
      "name": "Flame Extinguishment Experiment - 2",
      "short_name": "FLEX-2",
      "description": "FLEX-2 extended FLEX with soot formation measurements and cool-flame detection in heptane droplet flames at varying ambient conditions.",
      "fuel_type": "liquid",
      "fuel_material": "heptane, decane blends",
      "hardware": "MDCA in CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        32
      ],
      "pressure_psi": [
        8.0,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "soot sensor"
      ],
      "objectives": [
        "Measure soot volume fraction in droplet flames",
        "Detect cool-flame regime transitions",
        "Extend extinction maps to lower pressures"
      ],
      "key_findings": [
        "Soot formation suppressed below 8 psi",
        "Cool flames observed in droplet wake at low O\u2082",
        "Extended extinction maps down to 8 psi"
      ],
      "variables": [
        "oxygen %",
        "pressure",
        "fuel blend",
        "flow"
      ],
      "relevance": {
        "spacecraft": 8,
        "moon_base": 9,
        "mars": 8,
        "rover": 8,
        "earth": 7
      },
      "year": 2013,
      "duration_days": 120,
      "sample_count": 38,
      "si_summary": "FLEX-2 closes the low-pressure gap FLEX left open \u2014 critical for lunar habitat design at 10.2 psi.",
      "tags": [
        "soot",
        "cool flame",
        "droplet",
        "liquid"
      ],
      "flame_metrics": {
        "flame_temp_k": 1580,
        "flame_spread_rate_mms": 0.9,
        "loc_pct": 13.9,
        "quenching_distance_mm": 9.8,
        "radiative_fraction_pct": 44,
        "soot_volume_fraction_ppm": 0.35,
        "smoke_obscuration_od_m": 0.28,
        "co_co2_ratio": 0.12,
        "critical_heat_flux_kw_m2": 14.2,
        "cool_flame_capable": true,
        "flame_geometry": "Dual-Stage Spherical Shell",
        "flame_color": "Ghostly Dim Blue (Chemiluminescent)",
        "fsrl_level": 9,
        "extinguishment_method": "Low-Pressure Quenching / High-Dispersion Water Mist"
      }
    },
    {
      "id": "BASS",
      "name": "Burning and Suppression of Solids",
      "short_name": "BASS",
      "description": "BASS investigated the burning and extinguishment of solid fuels in microgravity, focusing on airflow and oxygen effects on flame spread over spacecraft materials.",
      "fuel_type": "solid",
      "fuel_material": "polymethyl methacrylate (PMMA)",
      "hardware": "Glovebox in MSG",
      "facility": "MSG",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "video camera",
        "oxygen sensor"
      ],
      "objectives": [
        "Characterize flame spread over solid materials",
        "Quantify minimum airflow for sustained combustion",
        "Test extinguishment strategies for solid fuel fires"
      ],
      "key_findings": [
        "Microgravity flames spread slower but more resilient",
        "Low-speed opposed flow sustains flames",
        "Water mist effective when properly directed"
      ],
      "variables": [
        "airflow speed",
        "oxygen %",
        "sample thickness",
        "pressure"
      ],
      "relevance": {
        "spacecraft": 10,
        "moon_base": 8,
        "mars": 8,
        "rover": 8,
        "earth": 7
      },
      "year": 2012,
      "duration_days": 120,
      "sample_count": 55,
      "si_summary": "BASS established boundary conditions for flame spread over spacecraft materials \u2014 the single most important precursor for ISS fire detection.",
      "tags": [
        "solid fuel",
        "flame spread",
        "suppression",
        "airflow"
      ],
      "flame_metrics": {
        "flame_temp_k": 1780,
        "flame_spread_rate_mms": 2.4,
        "loc_pct": 16.8,
        "quenching_distance_mm": 6.2,
        "radiative_fraction_pct": 34,
        "soot_volume_fraction_ppm": 2.1,
        "smoke_obscuration_od_m": 1.15,
        "co_co2_ratio": 0.18,
        "critical_heat_flux_kw_m2": 21.0,
        "cool_flame_capable": false,
        "flame_geometry": "Trailing Wake Flame",
        "flame_color": "Bright Luminous Yellow / Blue Anchor",
        "fsrl_level": 8,
        "extinguishment_method": "Active Airflow Cutoff + Nitrogen Flooding"
      }
    },
    {
      "id": "BASS-II",
      "name": "Burning and Suppression of Solids - II",
      "short_name": "BASS-II",
      "description": "BASS-II expanded BASS to a wider airflow range and additional fuel materials, including cotton blends and fiberglass.",
      "fuel_type": "solid",
      "fuel_material": "PMMA, cotton, fiberglass blends",
      "hardware": "Glovebox in MSG",
      "facility": "MSG",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "video camera",
        "gas analyzer"
      ],
      "objectives": [
        "Extend airflow range from BASS",
        "Test additional spacecraft materials",
        "Quantify suppression effectiveness across fuels"
      ],
      "key_findings": [
        "Cotton blends propagate faster than PMMA",
        "Extinction limits vary significantly by material",
        "Water mist effectiveness depends on droplet size"
      ],
      "variables": [
        "airflow",
        "material",
        "oxygen %",
        "pressure"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 8,
        "mars": 8,
        "rover": 8,
        "earth": 7
      },
      "year": 2014,
      "duration_days": 90,
      "sample_count": 48,
      "si_summary": "BASS-II extended BASS to realistic cabin materials and closed the geometry gap between lab samples and actual spacecraft interiors.",
      "tags": [
        "solid fuel",
        "cotton",
        "suppression",
        "material"
      ],
      "flame_metrics": {
        "flame_temp_k": 1690,
        "flame_spread_rate_mms": 3.1,
        "loc_pct": 18.2,
        "quenching_distance_mm": 5.5,
        "radiative_fraction_pct": 36,
        "soot_volume_fraction_ppm": 1.8,
        "smoke_obscuration_od_m": 0.95,
        "co_co2_ratio": 0.22,
        "critical_heat_flux_kw_m2": 24.5,
        "cool_flame_capable": false,
        "flame_geometry": "Creeping Surface Boundary Layer",
        "flame_color": "Flickering Orange-Amber with Blue Foot",
        "fsrl_level": 8,
        "extinguishment_method": "Direct Water-Mist Spray / Thermal Barrier Snuffing"
      }
    },
    {
      "id": "SAFFIRE-I",
      "name": "Spacecraft Fire Experiment-I",
      "short_name": "Saffire-I",
      "description": "Saffire-I studied large-scale fire growth in a spacecraft-like environment inside an uncrewed Cygnus cargo vehicle.",
      "fuel_type": "solid",
      "fuel_material": "SIBAL cloth (fiberglass/cotton blend)",
      "hardware": "Cygnus cargo vehicle",
      "facility": "Cygnus",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        21
      ],
      "pressure_psi": [
        14.7,
        14.7
      ],
      "airflow": "mixed",
      "sensors": [
        "thermocouple",
        "high-speed camera",
        "gas analyzer",
        "pressure sensor"
      ],
      "objectives": [
        "Characterize large-scale flame growth",
        "Measure toxic byproducts",
        "Validate computational fire models"
      ],
      "key_findings": [
        "Flame growth limits reached in minutes",
        "Significant CO and soot production detected",
        "Smoke detectors must handle low-velocity transport"
      ],
      "variables": [
        "fuel geometry",
        "airflow",
        "ignition location"
      ],
      "relevance": {
        "spacecraft": 10,
        "moon_base": 6,
        "mars": 8,
        "rover": 7,
        "earth": 6
      },
      "year": 2016,
      "duration_days": 14,
      "sample_count": 9,
      "si_summary": "Saffire-I is the anchor large-scale dataset for spacecraft fire safety. Its CO/soot data feed detector placement for ISS and future vehicles.",
      "tags": [
        "large-scale",
        "flame growth",
        "smoke",
        "microgravity"
      ],
      "flame_metrics": {
        "flame_temp_k": 1820,
        "flame_spread_rate_mms": 4.8,
        "loc_pct": 17.5,
        "quenching_distance_mm": 4.8,
        "radiative_fraction_pct": 42,
        "soot_volume_fraction_ppm": 3.2,
        "smoke_obscuration_od_m": 1.6,
        "co_co2_ratio": 0.28,
        "critical_heat_flux_kw_m2": 18.0,
        "cool_flame_capable": false,
        "flame_geometry": "Large-Scale Turbulent Plume",
        "flame_color": "Intense Luminous Yellow-Orange",
        "fsrl_level": 9,
        "extinguishment_method": "Compartment Depressurization / Halon Replacement"
      }
    },
    {
      "id": "SAFFIRE-II",
      "name": "Spacecraft Fire Experiment-II",
      "short_name": "Saffire-II",
      "description": "Saffire-II tested nine different spacecraft materials in a single large-scale microgravity burn, providing comparative flammability data.",
      "fuel_type": "solid",
      "fuel_material": "9 varied materials",
      "hardware": "Cygnus cargo vehicle",
      "facility": "Cygnus",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        21
      ],
      "pressure_psi": [
        14.7,
        14.7
      ],
      "airflow": "mixed",
      "sensors": [
        "thermocouple",
        "high-speed camera",
        "gas analyzer"
      ],
      "objectives": [
        "Compare flammability of 9 materials",
        "Identify highest-risk cabin materials",
        "Extend combustion models to varied fuels"
      ],
      "key_findings": [
        "Cotton blends propagate fastest; fiberglass slowest",
        "Material ranking differs from Earth-based tests",
        "Soot yield varies 5x across materials"
      ],
      "variables": [
        "material type",
        "airflow",
        "ignition"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 7,
        "mars": 8,
        "rover": 8,
        "earth": 7
      },
      "year": 2016,
      "duration_days": 12,
      "sample_count": 9,
      "si_summary": "Saffire-II's comparative material dataset is directly load-bearing for spacecraft material selection standards (NASA-STD-6001).",
      "tags": [
        "large-scale",
        "material",
        "flammability",
        "microgravity"
      ],
      "flame_metrics": {
        "flame_temp_k": 1740,
        "flame_spread_rate_mms": 1.8,
        "loc_pct": 19.1,
        "quenching_distance_mm": 7.0,
        "radiative_fraction_pct": 39,
        "soot_volume_fraction_ppm": 1.4,
        "smoke_obscuration_od_m": 0.78,
        "co_co2_ratio": 0.15,
        "critical_heat_flux_kw_m2": 26.0,
        "cool_flame_capable": false,
        "flame_geometry": "Segmented Strip Flame",
        "flame_color": "Multicolor Multi-Zone (Blue/Yellow)",
        "fsrl_level": 9,
        "extinguishment_method": "Material Specific Barrier / Passive Mesh Quenching"
      }
    },
    {
      "id": "SAFFIRE-III",
      "name": "Spacecraft Fire Experiment-III",
      "short_name": "Saffire-III",
      "description": "Saffire-III repeated large-scale burns with varied flow conditions to study flame spread over SIBAL cloth with controlled opposed flow.",
      "fuel_type": "solid",
      "fuel_material": "SIBAL cloth",
      "hardware": "Cygnus cargo vehicle",
      "facility": "Cygnus",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        21
      ],
      "pressure_psi": [
        14.7,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "high-speed camera",
        "gas analyzer"
      ],
      "objectives": [
        "Study flame spread with controlled flow",
        "Validate computational models",
        "Measure soot and CO under varied conditions"
      ],
      "key_findings": [
        "Opposed flow strongly affects spread rate",
        "Soot yield highest at low-flow conditions",
        "Model validation improved with new data"
      ],
      "variables": [
        "flow speed",
        "ignition location",
        "sample size"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 7,
        "mars": 8,
        "rover": 7,
        "earth": 6
      },
      "year": 2017,
      "duration_days": 11,
      "sample_count": 6,
      "si_summary": "Saffire-III provides the cleanest large-scale flow-controlled fire data, directly improving FDS simulation accuracy for spacecraft.",
      "tags": [
        "large-scale",
        "flow",
        "flame spread",
        "microgravity"
      ],
      "flame_metrics": {
        "flame_temp_k": 1890,
        "flame_spread_rate_mms": 7.2,
        "loc_pct": 16.2,
        "quenching_distance_mm": 3.9,
        "radiative_fraction_pct": 46,
        "soot_volume_fraction_ppm": 3.8,
        "smoke_obscuration_od_m": 1.82,
        "co_co2_ratio": 0.32,
        "critical_heat_flux_kw_m2": 17.2,
        "cool_flame_capable": false,
        "flame_geometry": "Forced Convective Flame Sheet",
        "flame_color": "Vigorous Yellow-Orange Sheet",
        "fsrl_level": 8,
        "extinguishment_method": "Emergency Cabin Isolation + CO\u2082 Total Flooding"
      }
    },
    {
      "id": "SAME",
      "name": "Solid Fuel Ignition and Extinction",
      "short_name": "SAME",
      "description": "SAME studied ignition, flame spread, and extinction of solid fuels at varying oxygen and pressure, focused on low-pressure high-oxygen habitats.",
      "fuel_type": "solid",
      "fuel_material": "PMMA and cotton blends",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "gas analyzer"
      ],
      "objectives": [
        "Determine flammability boundaries for habitat materials",
        "Measure ignition energy thresholds",
        "Provide data for low-pressure habitat design"
      ],
      "key_findings": [
        "Ignition energy drops dramatically above 30% O\u2082",
        "Low-pressure high-O\u2082 equals or worse than 1-atm air",
        "Extinction limits shift measurably with pressure"
      ],
      "variables": [
        "oxygen %",
        "pressure",
        "sample geometry",
        "airflow"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 9,
        "mars": 8,
        "rover": 9,
        "earth": 7
      },
      "year": 2019,
      "duration_days": 180,
      "sample_count": 68,
      "si_summary": "SAME is the closest existing dataset to lunar habitat fire-safety conditions, quantifying how lower pressure and elevated oxygen change ignition.",
      "tags": [
        "ignition",
        "low pressure",
        "high oxygen",
        "solid fuel"
      ],
      "flame_metrics": {
        "flame_temp_k": 1910,
        "flame_spread_rate_mms": 5.6,
        "loc_pct": 15.1,
        "quenching_distance_mm": 5.1,
        "radiative_fraction_pct": 40,
        "soot_volume_fraction_ppm": 2.4,
        "smoke_obscuration_od_m": 1.28,
        "co_co2_ratio": 0.24,
        "critical_heat_flux_kw_m2": 13.8,
        "cool_flame_capable": false,
        "flame_geometry": "Accelerated Boundary Wave",
        "flame_color": "Brilliant White-Yellow Core",
        "fsrl_level": 7,
        "extinguishment_method": "O\u2082 Drawdown below 15% / Rapid Quenching Blankets"
      }
    },
    {
      "id": "SAME-R",
      "name": "Solid Fuel Ignition and Extinction - Reflight",
      "short_name": "SAME-R",
      "description": "SAME-R expanded SAME with additional material types and extended test matrix for Artemis-era material screening.",
      "fuel_type": "solid",
      "fuel_material": "PMMA, Nomex, Kevlar blends",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        34
      ],
      "pressure_psi": [
        9.5,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "gas analyzer"
      ],
      "objectives": [
        "Expand material library to Nomex/Kevlar",
        "Test at 32% O\u2082 (lunar spec)",
        "Provide Artemis material screening data"
      ],
      "key_findings": [
        "Nomex shows 40% lower ignition energy at 32% O\u2082",
        "Kevlar blends sustain flame at low flow above 30% O\u2082",
        "Lunar-spec thresholds now empirically defined"
      ],
      "variables": [
        "oxygen %",
        "pressure",
        "material",
        "airflow"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 10,
        "mars": 9,
        "rover": 9,
        "earth": 7
      },
      "year": 2022,
      "duration_days": 120,
      "sample_count": 45,
      "si_summary": "SAME-R is the single closest investigation to lunar habitat conditions, testing directly at 32% O\u2082 \u2014 the Artemis spec.",
      "tags": [
        "ignition",
        "lunar spec",
        "high oxygen",
        "material"
      ],
      "flame_metrics": {
        "flame_temp_k": 1850,
        "flame_spread_rate_mms": 3.4,
        "loc_pct": 17.8,
        "quenching_distance_mm": 6.4,
        "radiative_fraction_pct": 37,
        "soot_volume_fraction_ppm": 1.2,
        "smoke_obscuration_od_m": 0.65,
        "co_co2_ratio": 0.14,
        "critical_heat_flux_kw_m2": 22.4,
        "cool_flame_capable": false,
        "flame_geometry": "Shielded Edge Flame",
        "flame_color": "Compact Blue-Amber",
        "fsrl_level": 8,
        "extinguishment_method": "Fine Water-Mist with Surfactant / Passive Barriers"
      }
    },
    {
      "id": "ACME-BRE",
      "name": "Advanced Combustion via Microgravity Experiments - Burning Rate Emulator",
      "short_name": "ACME-BRE",
      "description": "ACME-BRE measured burning rates of solid and liquid fuels in microgravity, focusing on emulating realistic material burning under controlled conditions.",
      "fuel_type": "solid",
      "fuel_material": "varied solid fuels",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "gas analyzer",
        "load cell"
      ],
      "objectives": [
        "Measure burning rates across fuel types",
        "Establish burning-rate database for models",
        "Quantify flow effects on burning"
      ],
      "key_findings": [
        "Burning rate non-monotonic vs airflow speed",
        "Solid and liquid converge at high airflow",
        "Recalibrates spacecraft fire models"
      ],
      "variables": [
        "airflow",
        "oxygen %",
        "fuel type",
        "geometry"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 6,
        "mars": 7,
        "rover": 7,
        "earth": 6
      },
      "year": 2020,
      "duration_days": 60,
      "sample_count": 32,
      "si_summary": "ACME-BRE delivers the burning-rate table that every downstream spacecraft fire model needs.",
      "tags": [
        "burning rate",
        "model validation",
        "microgravity"
      ],
      "flame_metrics": {
        "flame_temp_k": 1720,
        "flame_spread_rate_mms": 2.1,
        "loc_pct": 15.5,
        "quenching_distance_mm": 7.8,
        "radiative_fraction_pct": 48,
        "soot_volume_fraction_ppm": 1.1,
        "smoke_obscuration_od_m": 0.55,
        "co_co2_ratio": 0.09,
        "critical_heat_flux_kw_m2": 19.5,
        "cool_flame_capable": false,
        "flame_geometry": "Hemispherical Burner Envelope",
        "flame_color": "Cyan-Blue Laminar Dome",
        "fsrl_level": 8,
        "extinguishment_method": "Radiative Cooling / Flow Stagnation"
      }
    },
    {
      "id": "ACME-CFI",
      "name": "Advanced Combustion via Microgravity Experiments - Cool Flames Investigation",
      "short_name": "ACME-CFI",
      "description": "ACME-CFI extended cool-flame studies to a wider range of gaseous fuels and high oxygen concentrations, targeting detection of incipient fires.",
      "fuel_type": "gaseous",
      "fuel_material": "methane, ethane, propane blends",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        75
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "gas analyzer",
        "high-speed camera",
        "pressure transducer"
      ],
      "objectives": [
        "Extend cool-flame maps to blended fuels",
        "Test up to 75% O\u2082",
        "Inform early-detection sensor design"
      ],
      "key_findings": [
        "Cool flames exist up to 75% O\u2082",
        "Blends broaden cool-flame regime",
        "Detection requires multiple sensor modalities"
      ],
      "variables": [
        "oxygen %",
        "fuel blend",
        "temperature",
        "pressure"
      ],
      "relevance": {
        "spacecraft": 7,
        "moon_base": 10,
        "mars": 8,
        "rover": 9,
        "earth": 6
      },
      "year": 2022,
      "duration_days": 90,
      "sample_count": 24,
      "si_summary": "ACME-CFI is the second-highest O\u2082 investigation in this set, directly informing lunar habitat detection systems at 30%+ oxygen.",
      "tags": [
        "cool flame",
        "detection",
        "high oxygen",
        "gaseous"
      ],
      "flame_metrics": {
        "flame_temp_k": 680,
        "flame_spread_rate_mms": 1.1,
        "loc_pct": 11.2,
        "quenching_distance_mm": 11.4,
        "radiative_fraction_pct": 55,
        "soot_volume_fraction_ppm": 0.04,
        "smoke_obscuration_od_m": 0.06,
        "co_co2_ratio": 0.42,
        "critical_heat_flux_kw_m2": 11.0,
        "cool_flame_capable": true,
        "flame_geometry": "Pulsating Chemiluminescent Toroid",
        "flame_color": "Invisible UV / Pale Blue Halo",
        "fsrl_level": 8,
        "extinguishment_method": "Inert Gas Dilution (Ar/He) / Pressure Drawdown"
      }
    },
    {
      "id": "CFI-G",
      "name": "Cool Flames Investigation - Gaseous Fuels",
      "short_name": "CFI-G",
      "description": "CFI-G explored low-temperature 'cool flame' combustion in microgravity, including tests up to 85% O\u2082 to map low-temperature reaction pathways.",
      "fuel_type": "gaseous",
      "fuel_material": "methane, ethane, propane",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        85
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "gas analyzer",
        "high-speed camera",
        "pressure transducer"
      ],
      "objectives": [
        "Map cool flame regimes",
        "Measure ignition and extinction at 85% O\u2082",
        "Inform high-O\u2082 habitat fire safety"
      ],
      "key_findings": [
        "Cool flames observed at high O\u2082",
        "Multiple regimes coexist",
        "High-O\u2082 ignition sensitive to temperature"
      ],
      "variables": [
        "oxygen %",
        "pressure",
        "fuel type",
        "temperature"
      ],
      "relevance": {
        "spacecraft": 7,
        "moon_base": 10,
        "mars": 8,
        "rover": 9,
        "earth": 6
      },
      "year": 2021,
      "duration_days": 90,
      "sample_count": 28,
      "si_summary": "CFI-G is the only investigation in this set testing up to 85% O\u2082 \u2014 the highest relevance for lunar habitats and pressurized suits.",
      "tags": [
        "cool flame",
        "high oxygen",
        "gaseous",
        "ignition"
      ],
      "flame_metrics": {
        "flame_temp_k": 640,
        "flame_spread_rate_mms": 1.4,
        "loc_pct": 10.5,
        "quenching_distance_mm": 12.8,
        "radiative_fraction_pct": 58,
        "soot_volume_fraction_ppm": 0.02,
        "smoke_obscuration_od_m": 0.04,
        "co_co2_ratio": 0.48,
        "critical_heat_flux_kw_m2": 9.8,
        "cool_flame_capable": true,
        "flame_geometry": "Expanded Spherical Cloud",
        "flame_color": "Spectral Pale Violet-Blue",
        "fsrl_level": 9,
        "extinguishment_method": "Total Inerting (N\u2082 / Argon) \u2014 CO\u2082 Ineffective!"
      }
    },
    {
      "id": "SPICE",
      "name": "Structure and Liftoff In Combustion Experiment",
      "short_name": "SPICE",
      "description": "SPICE investigated structure and liftoff of non-buoyant jet flames in microgravity, providing insight into flame stability obscured by buoyancy on Earth.",
      "fuel_type": "gaseous",
      "fuel_material": "methane, ethane",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera"
      ],
      "objectives": [
        "Measure liftoff and blowout limits",
        "Characterize flame structure without buoyancy",
        "Validate stability models"
      ],
      "key_findings": [
        "Liftoff limits shift from Earth values",
        "Flame shape measurably different from 1-g",
        "Data improve detection thresholds"
      ],
      "variables": [
        "jet velocity",
        "oxygen %",
        "pressure"
      ],
      "relevance": {
        "spacecraft": 8,
        "moon_base": 6,
        "mars": 7,
        "rover": 6,
        "earth": 7
      },
      "year": 2013,
      "duration_days": 45,
      "sample_count": 22,
      "si_summary": "SPICE provides flame-stability data ISS fire detectors need to distinguish real fires from false positives.",
      "tags": [
        "flame structure",
        "liftoff",
        "gaseous",
        "stability"
      ],
      "flame_metrics": {
        "flame_temp_k": 1940,
        "flame_spread_rate_mms": 8.5,
        "loc_pct": 15.0,
        "quenching_distance_mm": 6.8,
        "radiative_fraction_pct": 33,
        "soot_volume_fraction_ppm": 1.9,
        "smoke_obscuration_od_m": 0.88,
        "co_co2_ratio": 0.07,
        "critical_heat_flux_kw_m2": 28.0,
        "cool_flame_capable": false,
        "flame_geometry": "Lifted Laminar Jet",
        "flame_color": "Bright Yellow Tip / Blue Stem",
        "fsrl_level": 7,
        "extinguishment_method": "Coflow Velocity Modulation / Fuel Valve Shutoff"
      }
    },
    {
      "id": "SPICE-2",
      "name": "Structure and Liftoff In Combustion Experiment - 2",
      "short_name": "SPICE-2",
      "description": "SPICE-2 extended SPICE to wider jet velocity range and blended fuels, improving stability maps for spacecraft fire detection.",
      "fuel_type": "gaseous",
      "fuel_material": "methane, ethylene blends",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "schlieren"
      ],
      "objectives": [
        "Extend jet velocity range",
        "Test blended gaseous fuels",
        "Refine detection thresholds"
      ],
      "key_findings": [
        "Blends shift liftoff velocity by 20%",
        "Structure more sensitive to O\u2082 than pure fuels",
        "Detection thresholds updated"
      ],
      "variables": [
        "jet velocity",
        "fuel blend",
        "oxygen %",
        "pressure"
      ],
      "relevance": {
        "spacecraft": 8,
        "moon_base": 7,
        "mars": 7,
        "rover": 7,
        "earth": 6
      },
      "year": 2015,
      "duration_days": 40,
      "sample_count": 18,
      "si_summary": "SPICE-2 refines SPICE's stability maps with blended fuels, directly improving false-positive rates in ISS smoke detection.",
      "tags": [
        "flame structure",
        "stability",
        "gaseous",
        "detection"
      ],
      "flame_metrics": {
        "flame_temp_k": 2050,
        "flame_spread_rate_mms": 9.8,
        "loc_pct": 14.2,
        "quenching_distance_mm": 5.9,
        "radiative_fraction_pct": 41,
        "soot_volume_fraction_ppm": 4.6,
        "smoke_obscuration_od_m": 1.75,
        "co_co2_ratio": 0.16,
        "critical_heat_flux_kw_m2": 25.5,
        "cool_flame_capable": false,
        "flame_geometry": "Soot-Capped Jet Cone",
        "flame_color": "Deep Orange-Gold with Black Soot Tail",
        "fsrl_level": 8,
        "extinguishment_method": "High-Pressure Inert Gas Pulse / Fuel Interruption"
      }
    },
    {
      "id": "SLICE",
      "name": "Solid Fuel Ignition and Extinction - Combustion of Solids",
      "short_name": "SLICE",
      "description": "SLICE extended SAME investigations to realistic material geometries and low-speed flow, focused on spacecraft cabin materials.",
      "fuel_type": "solid",
      "fuel_material": "PMMA, cotton, fiberglass blends",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "mixed",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "gas analyzer"
      ],
      "objectives": [
        "Extend flammability maps to realistic geometries",
        "Determine extinction limits for mixed flow",
        "Inform material selection"
      ],
      "key_findings": [
        "Mixed-flow narrows safe-airflow envelope",
        "Extinction limits highly material-dependent",
        "Flames possible at lower O\u2082 than expected"
      ],
      "variables": [
        "airflow",
        "oxygen %",
        "material",
        "sample size"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 8,
        "mars": 7,
        "rover": 7,
        "earth": 6
      },
      "year": 2022,
      "duration_days": 60,
      "sample_count": 26,
      "si_summary": "SLICE is the modern reference for solid-fuel extinction in mixed-flow spacecraft atmospheres.",
      "tags": [
        "extinction",
        "solid fuel",
        "mixed flow"
      ],
      "flame_metrics": {
        "flame_temp_k": 1760,
        "flame_spread_rate_mms": 2.8,
        "loc_pct": 17.2,
        "quenching_distance_mm": 6.6,
        "radiative_fraction_pct": 35,
        "soot_volume_fraction_ppm": 1.6,
        "smoke_obscuration_od_m": 0.82,
        "co_co2_ratio": 0.15,
        "critical_heat_flux_kw_m2": 20.8,
        "cool_flame_capable": false,
        "flame_geometry": "Creeping Elliptical Hemispheres",
        "flame_color": "Golden-Yellow with Thin Blue Skirt",
        "fsrl_level": 8,
        "extinguishment_method": "Thermal Barrier Cladding / Water-Mist Spray"
      }
    },
    {
      "id": "SLICE-2",
      "name": "Solid Fuel Ignition and Extinction - Extended Materials",
      "short_name": "SLICE-2",
      "description": "SLICE-2 extended material library to include next-generation composites and 3D-printed polymers proposed for future habitats.",
      "fuel_type": "solid",
      "fuel_material": "3D-printed polymers, advanced composites",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        32
      ],
      "pressure_psi": [
        9.5,
        14.7
      ],
      "airflow": "mixed",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "gas analyzer"
      ],
      "objectives": [
        "Test 3D-printed habitat materials",
        "Compare composite flammability",
        "Screen next-gen materials for Artemis"
      ],
      "key_findings": [
        "3D-printed polymers ignite 30% lower than PMMA",
        "Composite flammability varies 3x",
        "Several candidates fail lunar-spec at 30% O\u2082"
      ],
      "variables": [
        "material",
        "oxygen %",
        "pressure",
        "airflow"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 9,
        "mars": 8,
        "rover": 8,
        "earth": 7
      },
      "year": 2023,
      "duration_days": 75,
      "sample_count": 30,
      "si_summary": "SLICE-2 is the most relevant investigation for 3D-printed habitat materials \u2014 a critical need for Artemis.",
      "tags": [
        "3D-printed",
        "composite",
        "solid fuel",
        "Artemis"
      ],
      "flame_metrics": {
        "flame_temp_k": 1810,
        "flame_spread_rate_mms": 3.9,
        "loc_pct": 16.5,
        "quenching_distance_mm": 5.8,
        "radiative_fraction_pct": 39,
        "soot_volume_fraction_ppm": 2.2,
        "smoke_obscuration_od_m": 1.1,
        "co_co2_ratio": 0.21,
        "critical_heat_flux_kw_m2": 16.2,
        "cool_flame_capable": false,
        "flame_geometry": "Channelized Bead Flame",
        "flame_color": "Intense Orange with Sparking Particulate",
        "fsrl_level": 8,
        "extinguishment_method": "Flame Retardant Matrix Doping / Layer-Seal Snuffing"
      }
    },
    {
      "id": "DAFT",
      "name": "Dust and Aerosol in Fire Tests",
      "short_name": "DAFT",
      "description": "DAFT studied fine-particle and aerosol behavior in microgravity combustion, with direct implications for smoke detection and particle transport in spacecraft cabins.",
      "fuel_type": "gaseous",
      "fuel_material": "particulate / aerosol mixtures",
      "hardware": "Glovebox",
      "facility": "MSG",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "still",
      "sensors": [
        "particle sizer",
        "video camera",
        "gas analyzer"
      ],
      "objectives": [
        "Measure particle formation and transport",
        "Characterize smoke plume in still air",
        "Inform detector placement"
      ],
      "key_findings": [
        "Particle plumes persist longer in microgravity",
        "Transport dominated by diffusion, not buoyancy",
        "Detector placement must account for non-buoyant plumes"
      ],
      "variables": [
        "airflow",
        "particle size",
        "oxygen %"
      ],
      "relevance": {
        "spacecraft": 8,
        "moon_base": 7,
        "mars": 7,
        "rover": 8,
        "earth": 9
      },
      "year": 2018,
      "duration_days": 30,
      "sample_count": 18,
      "si_summary": "DAFT is the definitive microgravity smoke-transport study, directly informing residential smoke-detector algorithms on Earth.",
      "tags": [
        "smoke",
        "particles",
        "detection",
        "microgravity"
      ],
      "flame_metrics": {
        "flame_temp_k": 1450,
        "flame_spread_rate_mms": 0.6,
        "loc_pct": 13.5,
        "quenching_distance_mm": 9.5,
        "radiative_fraction_pct": 52,
        "soot_volume_fraction_ppm": 0.6,
        "smoke_obscuration_od_m": 0.92,
        "co_co2_ratio": 0.35,
        "critical_heat_flux_kw_m2": 15.0,
        "cool_flame_capable": false,
        "flame_geometry": "Non-Buoyant Diffuse Aerosol Cloud",
        "flame_color": "Dull Red / Ash Gray Plume",
        "fsrl_level": 7,
        "extinguishment_method": "HEPA Electrostatic Filtration / Aerosol Scrubbing"
      }
    },
    {
      "id": "DAFT-2",
      "name": "Dust and Aerosol in Fire Tests - Forced Flow",
      "short_name": "DAFT-2",
      "description": "DAFT-2 extended DAFT with forced-flow conditions matching real spacecraft cabin ventilation, providing realistic smoke transport data.",
      "fuel_type": "gaseous",
      "fuel_material": "particulate / aerosol mixtures",
      "hardware": "Glovebox",
      "facility": "MSG",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "particle sizer",
        "video camera",
        "gas analyzer",
        "flow meter"
      ],
      "objectives": [
        "Measure smoke transport with ventilation",
        "Compare still vs forced flow",
        "Refine detector algorithms"
      ],
      "key_findings": [
        "Forced flow reduces plume persistence by 60%",
        "Detector algorithms require flow-compensation",
        "Earth-side smoke detectors updated"
      ],
      "variables": [
        "airflow",
        "particle size",
        "ventilation rate"
      ],
      "relevance": {
        "spacecraft": 9,
        "moon_base": 7,
        "mars": 7,
        "rover": 8,
        "earth": 9
      },
      "year": 2020,
      "duration_days": 25,
      "sample_count": 15,
      "si_summary": "DAFT-2 is the highest-relevance Earth spin-off investigation, directly improving Nest Protect and other smart detector algorithms.",
      "tags": [
        "smoke",
        "forced flow",
        "detection",
        "ventilation"
      ],
      "flame_metrics": {
        "flame_temp_k": 1520,
        "flame_spread_rate_mms": 1.8,
        "loc_pct": 14.1,
        "quenching_distance_mm": 8.2,
        "radiative_fraction_pct": 47,
        "soot_volume_fraction_ppm": 0.9,
        "smoke_obscuration_od_m": 1.05,
        "co_co2_ratio": 0.3,
        "critical_heat_flux_kw_m2": 17.5,
        "cool_flame_capable": false,
        "flame_geometry": "Elongated Ventilation Streamer",
        "flame_color": "Faint Orange Core with Smoke Tail",
        "fsrl_level": 8,
        "extinguishment_method": "Duct Damper Auto-Closure / CO\u2082 Injection"
      }
    },
    {
      "id": "E-FIELD",
      "name": "Electric Field Effects on Flames",
      "short_name": "E-FIELD",
      "description": "E-FIELD investigated how electric fields influence flame behavior in microgravity, exploring electrostatic mechanisms for active flame control or suppression.",
      "fuel_type": "gaseous",
      "fuel_material": "methane",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "high-speed camera",
        "electric field probe"
      ],
      "objectives": [
        "Measure flame response to electric fields",
        "Test electrostatic suppression feasibility",
        "Characterize ion-driven deformation"
      ],
      "key_findings": [
        "Strong fields deform flames and cause extinction",
        "Ionic wind dominates at high field strengths",
        "Feasible as lightweight suppression technique"
      ],
      "variables": [
        "field strength",
        "airflow",
        "oxygen %"
      ],
      "relevance": {
        "spacecraft": 8,
        "moon_base": 6,
        "mars": 6,
        "rover": 6,
        "earth": 5
      },
      "year": 2023,
      "duration_days": 40,
      "sample_count": 12,
      "si_summary": "E-FIELD is the most novel investigation here \u2014 electrostatic flame control could become a lightweight, consumable-free suppression method.",
      "tags": [
        "electric field",
        "suppression",
        "microgravity",
        "novel"
      ],
      "flame_metrics": {
        "flame_temp_k": 1880,
        "flame_spread_rate_mms": 1.2,
        "loc_pct": 18.9,
        "quenching_distance_mm": 10.5,
        "radiative_fraction_pct": 36,
        "soot_volume_fraction_ppm": 0.25,
        "smoke_obscuration_od_m": 0.15,
        "co_co2_ratio": 0.05,
        "critical_heat_flux_kw_m2": 32.0,
        "cool_flame_capable": false,
        "flame_geometry": "Electro-Stretched Flat Disk",
        "flame_color": "Electric Violet-Blue Fringe",
        "fsrl_level": 6,
        "extinguishment_method": "High-Voltage Electrostatic Quenching (Zero-Consumable)"
      }
    },
    {
      "id": "C-FLAME",
      "name": "Coflow Laminar Flame Experiment",
      "short_name": "C-FLAME",
      "description": "C-FLAME studied structure and stability of laminar coflow diffusion flames in microgravity, refining fundamental combustion theory for spacecraft models.",
      "fuel_type": "gaseous",
      "fuel_material": "methane, ethylene",
      "hardware": "CIR",
      "facility": "CIR",
      "gravity": "microgravity",
      "oxygen_concentration": [
        21,
        30
      ],
      "pressure_psi": [
        10.2,
        14.7
      ],
      "airflow": "forced",
      "sensors": [
        "thermocouple",
        "radiometer",
        "high-speed camera",
        "gas analyzer"
      ],
      "objectives": [
        "Characterize laminar coflow structure",
        "Test fundamental combustion theory",
        "Provide validation data for models"
      ],
      "key_findings": [
        "Flame structure follows theory in 0-g",
        "Soot formation enhanced at low flow",
        "Data improve 2D combustion models"
      ],
      "variables": [
        "fuel velocity",
        "oxygen %",
        "pressure",
        "geometry"
      ],
      "relevance": {
        "spacecraft": 7,
        "moon_base": 6,
        "mars": 6,
        "rover": 6,
        "earth": 7
      },
      "year": 2014,
      "duration_days": 60,
      "sample_count": 20,
      "si_summary": "C-FLAME provides the fundamental laminar flame data needed to validate any spacecraft fire model, including those used in Saffire analysis.",
      "tags": [
        "laminar",
        "coflow",
        "structure",
        "gaseous"
      ],
      "flame_metrics": {
        "flame_temp_k": 1680,
        "flame_spread_rate_mms": 2.2,
        "loc_pct": 15.8,
        "quenching_distance_mm": 8.0,
        "radiative_fraction_pct": 50,
        "soot_volume_fraction_ppm": 0.15,
        "smoke_obscuration_od_m": 0.08,
        "co_co2_ratio": 0.04,
        "critical_heat_flux_kw_m2": 23.0,
        "cool_flame_capable": false,
        "flame_geometry": "Parabolic Laminar Envelope",
        "flame_color": "Pure Chemiluminescent Blue",
        "fsrl_level": 8,
        "extinguishment_method": "Nitrogen Dilution / Coflow Inerting"
      }
    }
  ]
};
