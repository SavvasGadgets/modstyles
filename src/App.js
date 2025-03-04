import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Card, CardContent, Chip, Grid2 as Grid, IconButton, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
 } from '@mui/icons-material';

const placeholderInitData = {
  "classes": [
    {
      "label": "A Head",
      "name": "a_head"
    },
    {
      "label": "B Head",
      "name": "b_head"
    },
    {
      "label": "C Head",
      "name": "c_head"
    },
    {
      "label": "D Head",
      "name": "d_head"
    },
    {
      "label": "E Head",
      "name": "e_head"
    },
    {
      "label": "F Head",
      "name": "f_head"
    },
    {
      "label": "Body Text",
      "name": "body_text"
    },
    {
      "label": "Body Text Display",
      "name": "body_text_display",
      "styles": {
        "size": "lg",
        "fontWeight": "600"
      }
    },
    {
      "label": "Body Text Inline",
      "name": "body_text_inline",
      "styles": {
        "fontWeight": "700"
      }
    }
  ],
  "contexts": [],
  "aliases": []
}

const placeholderColorData = [
    "Orange 1",
    "Red 1",
    "Plum 1",
    "Plum 2",
    "Green 1",
    "Teal 1",
    "Blue 2"
]

export default function App() {

  const [classes, setClasses] = useState(placeholderInitData.classes)
  const [contexts, setContexts] = useState(placeholderInitData.contexts)
  const [aliases, setAliases] = useState(placeholderInitData.aliases)

  const handleClassesChange = (newClasses) => {
    setClasses(newClasses)
  }

  const handleContextsChange = (newContexts) => {
    setContexts(newContexts)
  }

  const handleAliasesChange = (newAliases) => {
    setAliases(newAliases)
  }

  return (
    <Stack spacing={2} padding={2}>
      <Paper sx={{padding: 2}}>
        <ClassEntries classes={classes} onChange={handleClassesChange} allContexts={contexts} allAliases={aliases} />
      </Paper>
      <Paper sx={{padding: 2}}>
        <ContextEntries contexts={contexts} onChange={handleContextsChange} allClasses={classes} allAliases={aliases} />
      </Paper>
      <Paper sx={{padding: 2}}>
        <AliasEntries aliases={aliases} onChange={handleAliasesChange} allClasses={classes} allContexts={contexts} />
      </Paper>
      <Paper sx={{padding: 2, border: '1px solid red'}}>
        <DangerZone />
      </Paper>
    </Stack>
  )
}

const DangerZone = () => {

  const isAdmin = true

  return (
    <Stack spacing={2}>
      <Typography>Danger Zone</Typography>
      <ImportSection isAdmin={isAdmin} />
      <hr />
      <ResetSection isAdmin={isAdmin} />
    </Stack>
  )
}

const ImportSection = ({ isAdmin }) => {

  const placeholderCourseList = ['Course 1', 'Course 2', 'Course 3']

  const [importButtonDisabled, setImportButtonDisabled] = useState(!isAdmin)
  const [importAlertVisible, setImportAlertVisible] = useState(false)

  const [selectedCourse, setSelectedCourse] = useState(null)

  const handleImportClick = () => {
    setImportAlertVisible(true)
    setImportButtonDisabled(true)
  }

  const handleSelectedCourseChange = (e) => {
    setSelectedCourse(e.target.value)
  }

  const handleImportConfirm = () => {
    setImportAlertVisible(false)
    setImportButtonDisabled(false)
    console.log('import the styles from the selected course: ', selectedCourse)
  }

  const handleImportCancel = () => {
    setImportAlertVisible(false)
    setImportButtonDisabled(false)
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Stack>
          <Typography>Copy Styles from Course</Typography>
          <Typography variant="body2">Remove all existing styles and replace with all styles from another course.</Typography>
        </Stack>
        <Stack spacing={2} alignItems={'center'}>
          <Button disabled={importButtonDisabled} size="small" variant="outlined" color="error" onClick={handleImportClick}>Import Styles</Button>
        </Stack>
      </Stack>
      {importAlertVisible &&
        <Alert severity="error">
          <Stack spacing={2}>
            <Typography>This action will overwrite all existing styles. Are you sure you want to proceed?</Typography>
            <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <TextField
                size="small"
                fullWidth
                select
                name={"aliases"}
                label={"Course"}
                value={selectedCourse ?? ''}
                onChange={handleSelectedCourseChange}
                >
                <MenuItem value={''}>&nbsp;</MenuItem>
                {placeholderCourseList.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <Stack spacing={2} direction={'row'}>
                <Button size="small" variant="outlined" color="error" onClick={handleImportConfirm}>Import</Button>
                <Button size="small" variant="contained" color="error" onClick={handleImportCancel}>Cancel</Button>
              </Stack>
            </Stack>
          </Stack>
        </Alert>
      }
    </Stack>
  )
}

const ResetSection = ({ isAdmin }) => {

  const [resetButtonDisabled, setResetButtonDisabled] = useState(!isAdmin)
  const [resetAlertVisible, setResetAlertVisible] = useState(false)

  const handleResetClick = () => {
    setResetAlertVisible(true)
    setResetButtonDisabled(true)
  }

  const handleResetConfirm = () => {
    setResetAlertVisible(false)
    setResetButtonDisabled(false)
    console.log('reset all styles to the global defaults')
  }

  const handleResetCancel = () => {
    setResetAlertVisible(false)
    setResetButtonDisabled(false)
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Stack>
          <Typography>Reset Styles to Default</Typography>
          <Typography variant="body2">Remove all existing styles and replace with the default global styles.</Typography>
        </Stack>
        <Stack spacing={2} alignItems={'center'}>
          <Button disabled={resetButtonDisabled} size="small" variant="outlined" color="error" onClick={handleResetClick}>Reset Styles</Button>
        </Stack>
      </Stack>
      {resetAlertVisible &&
        <Alert severity="error">
          <Stack spacing={2}>
            <Typography>This action will overwrite all existing styles. Are you sure you want to proceed?</Typography>
            <Stack spacing={2} direction={'row'}>
              <Button size="small" variant="outlined" color="error" onClick={handleResetConfirm}>Reset</Button>
              <Button size="small" variant="contained" color="error" onClick={handleResetCancel}>Cancel</Button>
            </Stack>
          </Stack>
        </Alert>
      }
    </Stack>
  )
}

const ClassEntries = ({ classes, onChange, allContexts, allAliases }) => {

  const handleClassChange = (index, key, value) => {
    const newClasses = [...classes]
    if (value && (value.length > 0 || Object.keys(value).length > 0)) {
      newClasses[index][key] = value
    } else {
      delete newClasses[index][key]
    }
    onChange(newClasses)
  }

  return (
    <Grid container spacing={2} direction="column">
      <Typography>Classes</Typography>
      {classes.map((classEntry, index) => (
        <Grid size={{xs: 12}} key={index}>
          <ClassEntry
            index={index}
            value={classEntry}
            onChange={(name, value) => handleClassChange(index, name, value)}
            allContexts={allContexts}
            allAliases={allAliases}
          />
        </Grid>
      ))}
    </Grid>
  )
}

const ClassEntry = ({ value, onChange, allContexts, allAliases }) => {

  const handleChange = (e) => {
    onChange(e.target.name, e.target.value)
  }

  const handleVariantClick = (contextName) => {
    document.getElementById(`contextClass--${contextName}--${value.name}`)?.scrollIntoView({behavior: 'smooth'})
  }

  const variantContexts = allContexts.filter((contextEntry) => contextEntry.classes?.filter((classEntry) => classEntry.name === value.name).length > 0)

  return (
    <Card variant="outlined" id={`class--${value.name}` ?? ''}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size="grow">
            <TextField size="small" fullWidth name="label" label="Label" value={value.label ?? ''} onChange={handleChange} />
          </Grid>
          <Grid size="grow">
            <TextField slotProps={{input:{readOnly:true}}} size="small" fullWidth name="name" label="Name" value={value.name ?? ''}  />
          </Grid>
          <Grid size={{xs: 12}}>
            <StyleDefinitions value={value.styles ?? {}} onChange={handleChange} />
          </Grid>
          <Grid size={{xs: 12}}>
            <TextField
              size="small"
              fullWidth
              select
              slotProps={{select: {multiple: true}}}
              name={"aliases"}
              label={"Aliases"}
              value={value.aliases ?? []}
              onChange={handleChange}
              >
              <MenuItem value={''}>&nbsp;</MenuItem>
              {allAliases.map((option, index) => (
                <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{xs: 12}}>
            <Stack direction="row" spacing={1}>
              <Typography>Contexts:</Typography>
              {variantContexts.length > 0 ? variantContexts.map((contextEntry, index) => (
                <Chip size="small" key={index} label={contextEntry.label} onClick={() => handleVariantClick(contextEntry.name)} />
              )) : <Typography sx={{fontStyle: 'italic', color: 'text.disabled'}}>none</Typography>}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const ContextEntries = ({ contexts, onChange, allClasses, allAliases }) => {

  const handleAddContext = () => {
    onChange([...contexts, {}])
  }

  const handleDeleteContext = (index) => {
    onChange(contexts.filter((_, i) => i !== index))
  }

  const handleContextChange = (index, key, value) => {
    const newContexts = [...contexts]
    if (value && (value.length > 0 || Object.keys(value).length > 0)) {
      newContexts[index][key] = value
    } else {
      delete newContexts[index][key]
    }
    onChange(newContexts)
  }
  return (
    <Grid container spacing={2} direction="column">
      <Typography>Contexts</Typography>
      {contexts.map((context, index) => (
        <Grid size={{xs: 12}} key={index}>
          <ContextEntry
            index={index}
            context={context}
            onChange={(name, value) => handleContextChange(index, name, value)}
            onDelete={() => handleDeleteContext(index)}
            allClasses={allClasses}
            allAliases={allAliases}
          />
        </Grid>
      ))}
      <Grid size={{xs: 12}}>
        <Button size="small" variant="outlined" onClick={handleAddContext}>
          <AddIcon fontSize='inherit' /> Add Context
        </Button>
      </Grid>
    </Grid>
  )
}

const ContextEntry = ({ context, onChange, onDelete, allClasses, allAliases }) => {

  const handleChange = (e) => {
    onChange(e.target.name, e.target.value)
  }

  const handleClassesChange = (newClasses) => {
    onChange('classes', newClasses)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid size="grow">
            <TextField size="small" fullWidth name="label" label="Label" value={context.label ?? ''} onChange={handleChange} />
          </Grid>
          <Grid size="grow">
            <TextField size="small" fullWidth name="name" label="Name" value={context.name ?? ''} onChange={handleChange}  />
          </Grid>
          <Grid size="auto">
            <IconButton size="small" onClick={onDelete}>
              <DeleteIcon fontSize='inherit' />
            </IconButton>
          </Grid>
          <Grid size={{xs: 12}} spacing={2}>
            <ContextClassEntries classes={context.classes} onChange={handleClassesChange} contextName={context.name} allClasses={allClasses} allAliases={allAliases} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const ContextClassEntries = ({ classes, onChange, contextName, allClasses, allAliases }) => {

  const handleAddClass = () => {
    onChange([...classes ?? [], {}])
  }

  const handleChangeClass = (index, value) => {
    onChange(classes.map((classEntry, i) => i === index ? value : classEntry))
  }

  const handleDeleteClass = (index) => {
    onChange(classes.filter((_, i) => i !== index))
  }

  return (
    <Grid container spacing={2} direction="column">
      <Typography>Classes</Typography>
      {classes?.map((contextClass, index) => (
        <ContextClassEntry
          key={index}
          index={index}
          classEntry={contextClass}
          onChange={(value) => handleChangeClass(index, value)}
          onDelete={() => handleDeleteClass(index)}
          contextName={contextName}
          allClasses={allClasses}
          allAliases={allAliases}
        />
      ))}
      <Grid size={{xs: 12}}>
        <Button size="small" variant="outlined" onClick={handleAddClass}>
          <AddIcon fontSize='inherit' /> Add Class to Context
        </Button>
      </Grid>
    </Grid>
  )
}

const ContextClassEntry = ({ classEntry, onChange, onDelete, contextName, allClasses, allAliases }) => {

  const handleChange = (e) => {
    onChange({...classEntry, [e.target.name]: e.target.value})
  }

  return (
    <Grid size={{xs: 12}} id={`contextClass--${contextName}--${classEntry.name}` ?? ''}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid size="grow">
              <TextField
                size="small"
                fullWidth
                select
                name={"name"}
                label={"Name"}
                value={classEntry.name ?? ''}
                onChange={handleChange}
                >
                <MenuItem value={''}>&nbsp;</MenuItem>
                {allClasses.map((option, index) => (
                  <MenuItem key={index} value={option.name}>{option.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size="auto">
              <IconButton size="small" onClick={onDelete}>
                <DeleteIcon fontSize='inherit' />
              </IconButton>
            </Grid>
            <Grid size={{xs: 12}}>
              <StyleDefinitions value={classEntry.styles ?? {}} onChange={handleChange} />
            </Grid>
            <Grid size={{xs: 12}}>
              <TextField
                size="small"
                fullWidth
                select
                slotProps={{select: {multiple: true}}}
                name={"aliases"}
                label={"Aliases"}
                value={classEntry.aliases ?? []}
                onChange={handleChange}
                >
                <MenuItem value={''}>&nbsp;</MenuItem>
                {allAliases.map((option, index) => (
                  <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

const AliasEntries = ({ aliases, onChange, allClasses, allContexts }) => {

  const handleAddAlias = () => {
    onChange([...aliases, {}])
  }

  const handleDeleteAlias = (index) => {
    onChange(aliases.filter((_, i) => i !== index))
  }

  const handleAliasChange = (index, key, value) => {
    const newAliases = [...aliases]
    if (value && (value.length > 0 || Object.keys(value).length > 0)) {
      newAliases[index][key] = value
    } else {
      delete newAliases[index][key]
    }
    onChange(newAliases)
  }

  return (
    <Grid container spacing={2} direction="column">
      <Typography>Aliases</Typography>
      {aliases.map((aliasEntry, index) => (
        <Grid size={{xs: 12}} key={index}>
          <AliasEntry
            index={index}
            value={aliasEntry}
            onChange={(name, value) => handleAliasChange(index, name, value)}
            onDelete={() => handleDeleteAlias(index)}
            allClasses={allClasses}
            allContexts={allContexts}
          />
        </Grid>
      ))}
      <Grid size={{xs: 12}}>
        <Button size="small" variant="outlined" onClick={handleAddAlias}>
          <AddIcon fontSize='inherit' /> Add Alias
        </Button>
      </Grid>
    </Grid>
  )
}

const AliasEntry = ({ value, onChange, onDelete, allClasses, allContexts }) => {

  const handleChange = (e) => {
    onChange(e.target.name, e.target.value)
  }

  const handleClassClick = (className, contextName) => {
    let elementId = contextName ? `contextClass--${contextName}--${className}` : `class--${className}`
    document.getElementById(elementId)?.scrollIntoView({behavior: 'smooth'})
  }

  const getClassPath = () => {
    let contextLabel = null
    let classLabel = null
    const contextData = allContexts.find((contextEntry) => contextEntry.classes?.find((classItem) => classItem.aliases?.includes(value.name)))
    let classData = allClasses.find((classItem) => classItem.aliases?.includes(value.name))
    if (contextData) {
      contextLabel = contextData.label ?? ''
      classData = contextData.classes.find((classItem) => classItem.aliases?.includes(value.name))
      classLabel = allClasses.find((classItem) => classItem.name === classData?.name).label ?? ''
    } else if (classData) {
      classLabel = classData?.label ?? ''
    }
    const classPath = contextLabel && classLabel ? `${contextLabel} → ${classLabel}` : contextLabel || classLabel
    return (
      classLabel &&
        <Grid size={{xs: 12}}>
          <Stack direction="row" spacing={1}>
            <Chip size="small" label={classPath} onClick={() => handleClassClick(classData?.name, contextData?.name)} />
          </Stack>
        </Grid>
    )
  }

  return (
    <Card variant="outlined" id={`aliasClass--${value.name}` ?? ''}>
      <Grid container spacing={2} p={2}>
        <Grid size="grow">
          <TextField size="small" fullWidth name="name" label="Name" value={value.name ?? ''} onChange={handleChange} />
        </Grid>
        <Grid size="auto">
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon fontSize='inherit' />
          </IconButton>
        </Grid>
        {getClassPath()}
      </Grid>
    </Card>
  )
}
  

const StyleDefinitions = ({value, onChange}) => {

  const colorFormats = [...placeholderColorData]
  const filledFormats = []
  colorFormats.map((color) => {
    filledFormats.push(`${color} Filled`)
  })
  const colorOptions = colorFormats.concat(filledFormats).map((color) => ({label: color, value: color}))

  const fields = [
    { name: "color", label: "Color", size: 6, options: colorOptions},
    { name: "decoration", label: "Decoration", size: 6, multiple: true, options: [
      { label: "Italic", value: "italic" },
      { label: "Underline", value: "underline" },
      { label: "Strike Through", value: "strikethrough" },
    ]},
    { name: "size", label: "Size", options: [
      { label: "Smaller", value: "sm" },
      { label: "Larger", value: "lg" }
    ]},
    { name: "fontWeight", label: "Font Weight", options: [
      { label: "Thin", value: '100' },
      { label: "Extra Light", value: '200' },
      { label: "Light", value: '300' },
      { label: "Regular", value: '400' },
      { label: "Medium", value: '500' },
      { label: "Semi Bold", value: '600' },
      { label: "Bold", value: '700' },
      { label: "Extra Bold", value: '800' },
      { label: "Black", value: '900' }
    ]},
    { name: "alignment", label: "Alignment", options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
      { label: "Justify", value: "justify" }
    ]},
  ]

  const handleChange = (e) => {
    let newValue = {...value}
    if (e.target.value.length > 0) {
      newValue = {...newValue, [e.target.name]: e.target.value }
    } else {
      const newStyles = {...value}
      delete newStyles[e.target.name]
      if (Object.keys(newStyles).length > 0) {
        newValue = {...newStyles}
      } else {
        newValue = null
      }
    }
    onChange({
      target: {
        name: "styles",
        value: newValue,
      }
    })
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Style Definition</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid size={field.size ?? 'grow'} key={index}>
              <TextField
                size="small"
                fullWidth
                select
                slotProps={{select: {multiple: field.multiple}}}
                name={field.name}
                label={field.label}
                value={value[field.name] ?? (field.multiple ? [] : '')}
                onChange={handleChange}
                >
                <MenuItem value={''}>&nbsp;</MenuItem>
                {field.options.map((option, index) => (
                  <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}