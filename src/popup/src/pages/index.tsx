import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  IconButton,
  InputBase,
  withStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash/debounce';
import copy from 'copy-to-clipboard';
import { connect } from 'dva';
import styles from './style';

interface Props {
  classes: any;
  iconList: Icon[];
  getIcons: (tag: string, query: string, marker: string, success: () => void) => void;
}

const initialState = {
  tag: 'brands',
  searchValue: '',
  success: false,
  loading: false,
  copy: false,
};

type State = Readonly<typeof initialState>;

class Index extends React.Component<Props, State> {
  public readonly state: State = initialState;

  timer = null;
  constructor(props: Props) {
    super(props);
    this.props.getIcons(this.state.tag, this.state.searchValue, '', () => console.log('success'));
    this.onSearch = debounce(this.onSearch, 300);
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
  }

  public onSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    this.setState({ searchValue });
    if (!this.state.loading) {
      this.setState({ success: false, loading: true });
    }
    this.props.getIcons(this.state.tag, searchValue, '', () => {
      this.timer = setTimeout(() => {
        this.setState({ success: true, loading: false });
      }, 1000);
    });
  };

  public onNext = () => {
    const lastIcon = this.props.iconList[this.props.iconList.length - 1];
    if (!this.state.loading) {
      this.setState({ success: false, loading: true });
    }
    this.props.getIcons(this.state.tag, '', lastIcon.Key + '/' + lastIcon.Name, () => {
      this.timer = setTimeout(() => {
        this.setState({ success: true, loading: false });
      }, 1000);
    });
  };

  public onCopy = (value: string) => {
    copy(value);
    this.setState({ copy: true });
    this.timer = setTimeout(() => {
      this.setState({ copy: false });
    }, 3000);
  };

  public render() {
    const { classes } = this.props;
    const { success, loading } = this.state;
    return (
      <Grid container={true}>
        <Grid item xs={12} sm={3}>
          <form className={classes.form}>
            <RadioGroup>
              {['brands', 'regular', 'solid'].map(key => {
                return (
                  <FormControlLabel
                    key={key}
                    control={
                      <Radio
                        checked={this.state.tag === key}
                        onChange={() => {
                          this.setState({ tag: key });
                          this.props.getIcons(key, this.state.searchValue, '', () =>
                            console.log('success')
                          );
                        }}
                        value={key}
                      />
                    }
                    label={key[0].toUpperCase() + key.slice(1)}
                  />
                );
              })}
            </RadioGroup>
            <Button
              variant="contained"
              color={this.state.copy ? 'primary' : 'secondary'}
              onClick={this.onNext}
              disabled={
                (this.state.searchValue.length != 0 || this.props.iconList.length < 18) &&
                !this.state.copy
              }
            >
              {this.state.copy ? 'COPY' : 'NEXT'}
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>
            <div className={classes.root}>
              <div className={classes.wrapper}>
                <IconButton color="primary">
                  <SearchIcon />
                </IconButton>
                {loading && <CircularProgress size={58} className={classes.circleProgress} />}
              </div>
              <InputBase
                autoFocus={true}
                className={classes.wrapper}
                placeholder="Search icons…"
                onChange={(e: any) => this.onSearch(e.target.value)}
                inputProps={{ 'aria-label': 'search icons' }}
              />
            </div>
          </Paper>
          <Typography className={classes.results}>
            {this.state.searchValue == ''
              ? `${this.props.iconList.length} Icons total`
              : `${this.props.iconList.length} matching Icons`}
          </Typography>
          {this.props.iconList.map((icon: Icon, index: number) => {
            return (
              <span
                key={index}
                className={classes.icon}
                onClick={() =>
                  this.onCopy(
                    `http://download-1252489651.cos.ap-shanghai.myqcloud.com/svgs/${icon.Key}/${icon.Name}.svg`
                  )
                }
              >
                <img
                  height={'20px'}
                  width={'20px'}
                  src={`http://download-1252489651.cos.ap-shanghai.myqcloud.com/svgs/${icon.Key}/${icon.Name}.svg`}
                />
                <p
                  onClick={() =>
                    this.onCopy(
                      `http://download-1252489651.cos.ap-shanghai.myqcloud.com/svgs/${icon.Key}/${icon.Name}.svg`
                    )
                  }
                >
                  {icon.Name}
                </p>
              </span>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    iconList: state.icon.icons,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getIcons: (tag: string, query: string, marker: string, success: () => void) => {
      dispatch({ type: 'icon/get', tag, query, marker, success });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index));
