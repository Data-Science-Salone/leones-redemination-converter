#!/usr/bin/env python
# coding: utf-8

# In[1]:


def redenomi_converter(figure,period=None):
    if period is not None:
        period = period.upper() 
    
    if figure is not None and period  == "NEW":
        denomination = figure / 1000
    elif figure is not None and period == "OLD":
        denomination = figure * 1000
    else:
        denomination = figure / 1000
    return denomination


# In[2]:


redenomi_converter(30.50,"old")


# In[3]:


redenomi_converter(30500,"new")


# In[ ]:




